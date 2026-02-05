import express from 'express';
import dotenv from 'dotenv';
import connectDb from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import userRouter from "./src/routes/user.routes.js";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRouter);

app.use("/api/auth", authRouter)

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(port, ()=>{
    connectDb();
    console.log(`Listening on port ${port}...`);
})