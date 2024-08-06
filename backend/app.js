import express from "express"
import {run} from "./database.js"
import "./routes/schedulers.js"
// import newsRouter from "./routes/getNewsArticles.js";
import cors from "cors"
const app = express();


run();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  }));

// Middleware to parse JSON bodies
app.use(express.json());
// app.use('/api',newsRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
