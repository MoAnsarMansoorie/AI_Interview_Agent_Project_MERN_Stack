import User from "../models/user.model.js";

export const getUserController = async (req, res) => {
    try {
        console.log("👤 Current User Request - userId:", req.userId);

        const userId = req.userId;
        
        if (!userId) {
            console.log("❌ No userId in request");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user ID provided"
            });
        }

        const user = await User.findById(userId).select("-__v -createdAt -updatedAt");

        if (!user) {
            console.log("❌ User not found for ID:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("✅ User retrieved successfully:", user._id);
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user
        });

    } catch (error) {
        console.error("❌ Error retrieving user:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
        });
    }
};