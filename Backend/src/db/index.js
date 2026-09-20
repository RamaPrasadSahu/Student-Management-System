import mongoose from "mongoose";
import {DB_NAME}  from "../constant.js";

const connectDB = async() =>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED AT HOST : ${connectioninstance.connection.host}`);
        try {
            await mongoose.connection.collection("users").dropIndexes();
            console.log("Cleaned old database indexes");
        } catch (indexErr) {
            // Collection may not exist yet on fresh setup
        }
    } catch (error) {
        console.log('connection failed',error);
        process.exit(1);
    }
}
 
export default connectDB



