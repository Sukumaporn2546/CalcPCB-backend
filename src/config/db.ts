
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const URI = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}?authSource=admin`;

export const connectDB = async function connect() {
    try {       
        const con = await mongoose.connect(URI);
        console.log(`MongoDB Connected: ${con.connection.host}`);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

