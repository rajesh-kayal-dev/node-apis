import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import PostRoutes from './routes/postRoutes.js'

dotenv.config()

connectDB();

const app = express();

//middleware
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", PostRoutes);

app.get('/health', (req, res) => {
    res.json({
        status: true,
        message: "Node Api is running"
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})