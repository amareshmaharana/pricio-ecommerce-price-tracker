import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI");
    }

    if (isConnected) {
        return console.log("MongoDB is already connected");
    }


    try {
        await mongoose.connect(process.env.MONGODB_URI)

        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error:", error);
        
    }
}