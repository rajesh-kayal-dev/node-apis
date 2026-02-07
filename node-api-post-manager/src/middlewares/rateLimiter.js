import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // max 5 attempts
    message: {
    message: "Too many login attempts. Try again after 15 minutes."
    }
})