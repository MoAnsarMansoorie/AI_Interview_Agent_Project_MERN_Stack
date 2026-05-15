import jwt from "jsonwebtoken"

export const isAuth = (req, res, next) => {
    try {
        console.log("🔒 Auth Middleware - Cookies received:", !!req.cookies.token);

        let token = req.cookies.token;
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            console.log("❌ No token provided in cookies or Authorization header");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        console.log("🔑 Token received, verifying...");
        
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET not configured");
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.id) {
            console.log("❌ Invalid token or missing ID");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token"
            });
        }

        console.log("✅ Token verified, userId:", decoded.id);
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("❌ Token expired");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token expired"
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            console.error("❌ Invalid token");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token"
            });
        }

        console.error("❌ Token verification error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Token verification failed",
            ...(process.env.NODE_ENV === "development" && { error: error.message })
        });
    }
};

