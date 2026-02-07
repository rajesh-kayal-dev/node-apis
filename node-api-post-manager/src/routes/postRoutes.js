import express from "express"
import authMiddleware from '../middlewares/authMiddleware.js'
import { postSchema } from "../validators/postValidator.js";

import {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}
    from "../controllers/postController.js";
import validate from "../middlewares/validate.js";

const router = express.Router();
//public
router.get("/", getAllPost);
router.get("/:id", getPostById);

//protected
router.post("/", authMiddleware, validate(postSchema), createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;