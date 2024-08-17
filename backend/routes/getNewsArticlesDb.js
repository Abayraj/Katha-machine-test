import express from 'express'
const router = express.Router();
import { AddNews, DeleteNewsById, getNewsArticlesById, getNewsArticlesDb, NewsUpdateById } from "../controllers/getNews.js";
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';


router.get('/get-news',getNewsArticlesDb);
router.get('/get/:id',isAuthenticatedUser,authorizeRoles('admin'),getNewsArticlesById);
router.patch('/update/:id',isAuthenticatedUser,authorizeRoles('admin'),NewsUpdateById);
router.delete('/delete-news/:id',isAuthenticatedUser,authorizeRoles('admin'),DeleteNewsById);
router.post('/new/article',isAuthenticatedUser,authorizeRoles('admin'),AddNews);


export default router;