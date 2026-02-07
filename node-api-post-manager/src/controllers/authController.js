import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';


export const refreshAccessToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        if (!oldRefreshToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const decoded = jwt.verify(
            oldRefreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== oldRefreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // 🔁 ROTATE TOKENS
        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(403).json({ message: "Refresh token expired" });
    }
};

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All filds are required" })
        }

        //check user exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const role = req.body.role?.toLowerCase() || "user";


        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        //generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully"
        });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        //validate
        if (!email || !password) {
            return res.status(400).json({ message: "Email and pasword required" })
        }

        //check user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409).json({ message: "User Not found" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(409).json({ message: "Invalid credentials" });
        }

        // generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        //save token
        user.refreshToken = refreshToken;
        await user.save();

        //send refreshtoken as cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //generate token
        // const token = jwt.sign(
        //     { id: user._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "7d" }
        // );

        // 5. Response
        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const logout = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
    }

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
}