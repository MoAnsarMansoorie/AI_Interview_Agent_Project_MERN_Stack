import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import { generalLimiter } from "./middlewares/rateLimit.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000
const NODE_ENV = process.env.NODE_ENV || "development"
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

const allowedOrigins = FRONTEND_URL.split(",").map(origin => origin.trim());

// CORS configuration based on environment
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy violation: origin ${origin} not allowed`));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};

// middleware
app.use(cors(corsOptions));
app.use(generalLimiter); // Apply rate limiting to all requests
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", environment: NODE_ENV });
});

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
        ...(NODE_ENV === "development" && { stack: err.stack })
    });
});

app.listen(PORT, () => {
    connectDb();
    console.log(`🚀 Server is running at http://localhost:${PORT} [${NODE_ENV}]`)
    console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`)
});
