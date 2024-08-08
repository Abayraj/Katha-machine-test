import express from 'express'
const router = express.Router();
import { getNewsArticlesById, getNewsArticlesDb, NewsUpdateById } from "../controllers/getNews.js";

router.get('/get-news',getNewsArticlesDb);
router.get('/get/:id',getNewsArticlesById);
router.patch('/update/:id',NewsUpdateById);

export default router;