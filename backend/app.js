import express from "express"
const app = express();
import {run} from "./database.js"
import newsRouter from "./routes/getNewsArticles.js";



run();

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api',newsRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
