import axios from 'axios';
import news from '../models/news.js';
import asyncHandler from 'express-async-handler';




export const getNewsArticles = async ()=>{
    try {
        const url = `${process.env.NEWS_API_URL}?domains=wsj.com&apiKey=${process.env.API_KEY}`;

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
    
    })

})