import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';


export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user._id);

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

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        //generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
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
    res.clearCookie("refreshToken");

    if (req.user) {
        req.user.refreshToken = null;
        await req.user.save();
    }

    res.json({ message: "Logged out successfully" });

}