import mongoose from "mongoose";
import {DB_NAME}  from "../constant.js";

const connectDB = async() =>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED AT HOST : ${connectioninstance.connection.host}`);
    } catch (error) {
        console.log('connection failed',error);
        process.exit(1);
    }
}
 
export default connectDB



