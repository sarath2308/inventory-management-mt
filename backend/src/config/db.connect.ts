import mongoose from "mongoose";

export async function connectDB() {
    try {
        const mongoUri = process.env.DB_URI;
        
        if (!mongoUri) {
            throw new Error("MONGODB_URI or DB_URI environment variable is not set");
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            w: "majority",
            maxPoolSize: 10,
            minPoolSize: 5,
        });
        
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    }
}
