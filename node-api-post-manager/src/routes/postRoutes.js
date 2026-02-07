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
import roleMiddleware from "../middlewares/roleMiddleware.js";
import postOwnership from "../middlewares/ownershipMiddleware.js";

const router = express.Router();
//public
router.get("/", getAllPost);
router.get("/:id", getPostById);

//protected
router.post("/", authMiddleware, validate(postSchema), createPost);

router.put("/:id", authMiddleware, postOwnership, updatePost);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deletePost);

export default router;