import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cors from "cors";
import {v2 as cloudinary} from 'cloudinary';
import {app,server} from './socket/socket.js'

dotenv.config();

connectDB();


const port = process.env.PORT || 8000;


// cloudinary config
const data =  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// console.log(data)

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});