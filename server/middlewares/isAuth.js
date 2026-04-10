import jwt from "jsonwebtoken"

export const isAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
            error
        });
    }
};

