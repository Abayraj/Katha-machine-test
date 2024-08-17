import express from "express"
import {run} from "./database.js"
import "./routes/schedulers.js"
import getNewsArticlesDb from "./routes/getNewsArticlesDb.js";
import cors from "cors"
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));


run();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api',getNewsArticlesDb,authRoutes);



// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error details
  res.status(500).json({ // Send a 500 Internal Server Error response
      success: false,
      message: 'Something went wrong!',
      error: err.message
  });
  console.log(err,"global error")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
