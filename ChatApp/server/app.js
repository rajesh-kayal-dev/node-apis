import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server, {                     // ✅ add CORS here too
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    },
});


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST"],
}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {
    console.log("Client connected Id:",  socket.id );

    socket.on("message", ({room, message}) => {
        console.log(room, message);
        socket.to(room).emit("receive-message", message);
    })
    /*socket.broadcast.emit('welcome', `Welcome to the Chat!`);
    socket.broadcast.emit('welcome', `Id: ${socket.id} joined!`);*/

    socket.on('disconnect', () => {
        console.log("Client disconnected",  socket.id);
    })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
