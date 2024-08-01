import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://e5470843:e5470843mongopass@cluster0.pueajqg.mongodb.net/los-distinguidos').then(()=>console.log('DB connected'))
}