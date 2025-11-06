import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";


export const signup = async (req, res) => {
    const { Username, email, Password } = req.body;

    try {
        if (!Username || !email || !Password) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        if (Password.length <= 8) {
            return res.status(400).json({ message: "Password must contain at least 9 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const usernameExists = await User.findOne({ Username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists, try a different one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = new User({
            Username,
            email,
            Password: hashedPassword
        });

        if(newUser){
            const saveduser = await newUser.save();
        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            Username: newUser.Username,
            email: newUser.email,
            profilepic: newUser.profilepic || null
        });

        
        try{
            await sendWelcomeEmail(saveduser.email, saveduser.Username, ENV_CLIENT_URL);
        }catch(error){
            console.error("Failed to send welcome email:", error);
        }
        }else{
            res.status(400).json({message : "INVALID USER DATA"});
        }
    

    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, Password } = req.body;

    try {
        if (!email || !Password) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            Username: user.Username,
            email: user.email,
            profilepic: user.profilepic || null
        });

    } catch (error) {
        console.log("Error in Login controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (_, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: "strict",
        //secure: process.env.NODE_ENV !== "development",
        maxAge: 0,
    });

    return res.status(200).json({ message: "Logout successfully" });
};
