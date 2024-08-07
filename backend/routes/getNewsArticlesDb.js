import express from 'express'
const router = express.Router();
import { getNewsArticlesDb } from "../controllers/getNews.js";

router.get('/get-news',getNewsArticlesDb);

export default router;