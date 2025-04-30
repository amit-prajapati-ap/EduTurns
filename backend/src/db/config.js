import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected Successfully"))
        
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MongoDB connection Failed: ", error)
        process.exit(1)
    }
}