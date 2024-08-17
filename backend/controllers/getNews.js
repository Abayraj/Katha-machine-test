import news from '../models/news.js';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

// Fetch and upsert news articles into the database
export const getNewsArticles = asyncHandler(async () => {
    try {
        const url = `${process.env.NEWS_API_URL}?sources=techcrunch&apiKey=${process.env.API_KEY}`;
        const response = await axios.get(url);
        const articles = response.data.articles;

        for (const article of articles) {
            const articleData = {
                source: {
                    id: article.source.id,
                    name: article.source.name
                },
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: new Date(article.publishedAt),
                content: article.content
            };

            // Upsert operation: Update if exists, insert if not
            await news.updateOne(
                { url: article.url }, // Filter by URL
                { $set: articleData }, // Update or insert
                { upsert: true } // Create if not exists
            );
        }
        console.log(articles, "arr");
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news articles from api' });
    }
});

// Get all news articles from the database
export const getNewsArticlesDb = asyncHandler(async (req, res) => {

    console.log("get new from db")
    try {
        const NewsDb = await news.find();
        if (!NewsDb || NewsDb.length === 0) {
            return res.status(404).json({ error: "No news articles found" });
        }
        res.status(200).json({
            success: true,
            NewsDb
        });
    } catch (error) {
        console.error('Error fetching news articles from database:', error.message);
        res.status(500).json({ error: 'Failed to fetch news articles from database' });
    }
});

// Get a specific news article by ID
export const getNewsArticlesById = asyncHandler(async (req, res) => {
    try {
        const NewsDb = await news.findById(req.params.id);
        if (!NewsDb) {
            return res.status(404).json({ error: "News article not found" });
        }
        res.status(200).json({
            success: true,
            NewsDb
        });
    } catch (error) {
        console.error('Error fetching news article by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch news article' });
    }
});

// Update a specific news article by ID
export const NewsUpdateById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const formData = req.body;

    try {
        const updatedArticle = await news.findByIdAndUpdate(id, formData, {
            new: true,
            runValidators: true
        });
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({
            success: true,
            updatedArticle
        });
    } catch (error) {
        console.error('Error updating news article by ID:', error.message);
        res.status(500).json({ error: 'Failed to update news article' });
    }
});

// Delete a specific news article by ID
export const DeleteNewsById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNews = await news.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.status(200).json({
            message: 'News article deleted successfully',
            deletedNews
        });
    } catch (error) {
        console.error('Error deleting news article by ID:', error.message);
        res.status(500).json({ error: 'Failed to delete news article' });
    }
});

// Add a new news article
export const AddNews = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        publishedAt,
        description,
        url,
        urlToImage
    } = req.body;


    try {
        const newNews = new news({
            title,
            author,
            publishedAt,
            description,
            url,
            urlToImage
        });

        const savedLatestNews = await newNews.save();
        res.status(201).json(savedLatestNews);
    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ error: 'News article with the same title or URL already exists' });
        }
    
        res.status(500).json({ error: 'Failed to add new news article' });
    }
});
