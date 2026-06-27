import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Drop the problematic email index if it exists
    try {
      const userCollection = mongoose.connection.collection("users");
      const indexes = await userCollection.getIndexes();

      if (indexes.email_1) {
        console.log("Dropping problematic email_1 index...");
        await userCollection.dropIndex("email_1");
        console.log("Index email_1 dropped successfully");
      }
    } catch (indexErr) {
      console.log("Index cleanup info:", indexErr.message);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error("Failed to connect to MongoDB. Retrying...");
  }
};

export default connectDB;
