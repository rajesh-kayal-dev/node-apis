import express from "express"
import { login, logout, refreshAccessToken, register } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login",loginLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);

export default router;