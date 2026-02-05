import jwt from "jsonwebtoken";

const genToken = (id) => {
    try {
        const token = jwt.sign(
            { userId: id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.error("JWT Token error:", error);
    }
};

export default genToken;
