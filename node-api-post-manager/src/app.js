import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import PostRoutes from './routes/postRoutes.js'
import helmet from 'helmet';
import cors from "cors";
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 15 * 6 * 1000, //15 min
    max: 100, //max requests per IP
    message: {
        message: "Too many requests, try again later"
    }
})



dotenv.config()

connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(helmet()); ///Helmet secures HTTP headers automatically.

app.use(cors({//Prevents random websites from calling your API
    origin: ["http://localhost:3000"], // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


//apply gobal api to protect every routes
app.use("/api", apiLimiter); //Rate limiting protects APIs from brute force and DoS attacks.
//LIMIT REQUEST BODY SIZE
app.use(express.json({ limit: "10kb" })); //Prevents large payload and Improves performance


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

//SECURE ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong"
  });
});
