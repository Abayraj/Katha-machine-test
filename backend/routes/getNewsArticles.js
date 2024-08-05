import express from 'express'
import { getNewsArticles } from '../controllers/getNews.js'
const router = express.Router();

router.get('/news',getNewsArticles);

export default router;