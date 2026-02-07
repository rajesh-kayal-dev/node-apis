import Post from "../models/Post.js";

const postOwnership = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Admin bypass
    if (req.user.role === "admin") {
      req.post = post;
      return next();
    }

    // Owner check
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    req.post = post; // attach post
    next();

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default postOwnership;
