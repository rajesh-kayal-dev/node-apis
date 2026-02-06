import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {

        const { title, description, skills } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "title and description is required" })
        }

        const NewPost = await Post.create({
            title,
            description,
            skills,
            user: req.user._id
        })

        return res.status(201).json({
            message: "Post created",
            "Post": NewPost
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })

        if (!posts) {
            return res.status(401).json({ message: "There is no post, Plsese create a post" });
        }

        res.json(posts)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
            .populate("user", "name email")

        if (!post) {
            return res.status(401).json({ message: "Post not found" });
        }

        res.json(post);


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(403).json({ message: "Post not found" });
        }

        //WONERSHIP CHECK
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denaied" });
        }

        post.title = req.body.title || post.title,
            post.description = req.body.description || post.description,
            post.skills = req.body.skills || post.skills,


            await post.save();

        res.json({
            message: "Post updated",
            post: post
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(403).json({ message: "Post not found" })
        }

        //wonership check
        if (post.user.toString() != req.user._id.toString()) {
            return res.status(401).json({ message: "Aaccess denied" })
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted succesfully"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}