import User from "../models/user.model.js";
import genToken from "../config/token.js";

// frontend data
// create user
// token generate
// cookie

export const googleAuthController = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1. Check if user exists in DB
        let user = await User.findOne({ email });

        // 2. If user doesn't exist, create a new user
        if (!user) {
            user = await User.create({ 
                name, 
                email 
            });
        }

        // 3. Generate JWT token
        const token = genToken(user._id);

        // 4. Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production (requires HTTPS)
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // 5. Send response with user data (excluding sensitive info)
        return res.status(200).json({
            success: true,
            message: "Google Authentication successful",
            user
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Google Authentication failed",
            error
        })
    }
}


export const logoutController = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error
        })
    }
};
