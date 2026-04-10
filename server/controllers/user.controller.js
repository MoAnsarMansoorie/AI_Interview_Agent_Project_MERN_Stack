import User from "../models/user.model.js";

export const getUserController = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-__v -createdAt -updatedAt");

        if (!user) {    
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            error
        });
    }
};