import axios from 'axios';
import news from '../models/news.js';
import asyncHandler from 'express-async-handler';
import { json } from 'express';




export const getNewsArticles = async ()=>{
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

        console.log(articles,"arr")
    } catch (error) {
     console.log(error)
    }
    
};
export const getNewsArticlesDb = asyncHandler(async(req,res,next)=>{
    const NewsDb = await news.find();
    res.status(200).json({
        success:true,
        NewsDb
    
    });

});

export const getNewsArticlesById = asyncHandler(async(req,res,next)=>{
    const NewsDb = await news.findById(req.params.id);
    res.status(200).json({
        status:true,
        NewsDb
    });
});

export const NewsUpdateById = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const formData = req.body;

    const updatedArticle = await news.findByIdAndUpdate(id,formData, {
        new: true,
        runValidators: true
    });
    console.log(updatedArticle)

    if (!updatedArticle) {
        res.status(404);
        throw new Error('Article not found');
    }

    res.status(200).json({
        status: true,
        updatedArticle
    });

})