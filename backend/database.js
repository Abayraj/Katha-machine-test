
import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();






const uri = process.env.DB_URI;

const mongooseOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};




// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri,mongooseOptions);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error){
    console.log(error,"error dbb")
    console.log("error")
    process.exit(1); 

  }
}



