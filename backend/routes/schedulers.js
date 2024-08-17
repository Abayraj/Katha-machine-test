import cron from 'node-cron'
import { getNewsArticles } from '../controllers/getNews.js';


cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled task...');
    getNewsArticles();
});


// console.log("hello cron")


