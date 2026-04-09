import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000

// middeleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running at port http://localhost:${PORT}`)
});
