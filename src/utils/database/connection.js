import mongoose from "mongoose"
import { DB_URL } from "../../configs/index.js"

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected successFull.')
    } catch (err) {
        console.log("database failed: ")
    }
}

export default connectDB;