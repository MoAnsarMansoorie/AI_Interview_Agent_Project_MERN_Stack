import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected succefully`)
        
    } catch (error) {
        console.log(`Error in connecting database`)
    }
}

export default connectDb;