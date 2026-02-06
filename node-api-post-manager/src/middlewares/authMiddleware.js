import jwt from "jsonwebtoken"
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //check header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        //Extract Token
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //atchet to user request
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();

    } catch (error) {
        console.error("JWT error:", error.name, error.message);
        return res.status(401).json({ message: "Invalid or expire token" });
    }
}

export default authMiddleware