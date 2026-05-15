import User from "../models/user.model.js";
import genToken from "../config/token.js";
import { validateEmail, validateName, sanitizeInput } from "../utils/validation.js";

// frontend data
// create user
// token generate
// cookie

export const googleAuthController = async (req, res) => {
    try {
        console.log("🔐 Google Auth Request Received:", { name: req.body.name, email: req.body.email });

        let { name, email } = req.body;

        // Input validation
        if (!email || !validateEmail(email)) {
            console.log("❌ Invalid email format:", email);
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!name || !validateName(name)) {
            console.log("❌ Invalid name:", name);
            return res.status(400).json({
                success: false,
                message: "Invalid name format (must be 2-100 characters)"
            });
        }

        // Sanitize inputs
        name = sanitizeInput(name);
        email = email.toLowerCase().trim();

        // 1. Check if user exists in DB
        let user = await User.findOne({ email });

        // 2. If user doesn't exist, create a new user
        if (!user) {
            user = await User.create({
                name,
                email,
                credits: 100
            });
            console.log("✅ New user created:", user._id);
        } else {
            console.log("✅ Existing user found:", user._id);
            // Ensure existing users have credits if missing
            if (user.credits === undefined || user.credits === null) {
                user.credits = 100;
                await user.save();
                console.log("💰 Credits initialized for existing user:", user._id);
            }
        }

        // 3. Generate JWT token
        const token = genToken(user._id);
        console.log("🎫 JWT Token generated");

        // 4. Set token in HTTP-only cookie
        // Use SameSite=None for cross-origin requests during development and production.
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log("🍪 Cookie set successfully", {
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        // 5. Send response with user data and token (useful when cookie transport is unreliable)
        return res.status(200).json({
            success: true,
            message: "Google Authentication successful",
            user,
            token
        });

    } catch (error) {
        console.error("❌ Google Auth Error:", error);
        return res.status(500).json({
            success: false,
            message: "Google Authentication failed",
            error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
        })
    }
}


export const logoutController = async (req, res) => {
    try {
        console.log("🚪 Logout request received");
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/"
        });
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("❌ Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
        })
    }
};
