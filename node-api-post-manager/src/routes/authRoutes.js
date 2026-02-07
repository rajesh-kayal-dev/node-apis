import express from "express"
import { login, register } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;