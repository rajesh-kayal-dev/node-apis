import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";
export const signUp = async( req, res) => {
    try{

        const {username,email, password} = req.body;
        const checkUserByUserName = await User.findOne({username})
        if(checkUserByUserName){
            res.status(400).json({message:"UserName already exists"});
        }

         const checkUserByEmail = await User.findOne({email})
        if(checkUserByEmail){
            res.status(400).json({message:"Email already exists"});
        }

        if (password.length < 6){
            res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const  hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,email,password: hashPassword
        })

        const token = genToken(user._id);


        res.cookie('token', token, {
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:false
        })

        return res.status(200).json({message:"User created successfully",
        token: token,
        user:user});


    }catch(error){
        res.status(500).json({message:"SignUp failed! "+error});
    }
}

export const login = async( req, res) => {
    try{

        const {email, password} = req.body;

         const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"User doesn't exist!"});
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            res.status(400).json({message:"Incorrect password!"});
        }

        const token = genToken(user._id);



        res.cookie('token', token, {
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:false
        })

        return res.status(200).json({message:"User Login successfully",
        token: token,
        user:user});


    }catch(error){
        res.status(500).json({message:"login failed! "+error});
    }
}

export const logout = async( req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({message:"Logged Out Successfully!"});
    }catch (error) {
        return res.status(500).json({message:"Logged Out Failed!"});
    }
}