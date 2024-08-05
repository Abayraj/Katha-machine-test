import axios from 'axios';
import asyncHandler from 'express-async-handler';




export const getNewsArticles = asyncHandler(async(req,res,next)=>{
    try {
        const url = `${process.env.NEWS_API_URL}?q=apple&from=2024-08-04&to=2024-08-04&sortBy=popularity&apiKey=${process.env.API_KEY}`;

        const response = await axios.get(url);

        res.status(200).json({
            success: true,
            articles: response.data.articles, // Assuming the API returns an array of articles
        });
        console.log(response.data.articles,"dataa")


    } catch (error) {
        next(error);
    }
    
})