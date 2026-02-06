import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        //veliadte 
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

        //generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Response
        res.json({
            message: "Login successful",
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