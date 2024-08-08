import mongoose from "mongoose";


const newsSchema = new mongoose.Schema(
    {
        source: {
          id: { type: String }, 
          name: { type: String }  
        },
        author: { type: String },
        title: { type: String },
        description: { type: String },
        url: { type: String, required: true, unique: true },
        urlToImage: { type: String },
        publishedAt: { type: Date},
        content: { type: String }
      },
      {
        timestamps: true  // Automatically manage `createdAt` and `updatedAt` fields
      }
    );

const Cart = mongoose.model("news", newsSchema);
export default Cart;
