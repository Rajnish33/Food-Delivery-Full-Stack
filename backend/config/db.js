import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
      // console.log(process.env.MONGODB_URI);
      
        if(!process.env.MONGODB_URI)
        {
            console.log('MONGOD_URI  is missing in .env file');

            
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(DB_NAME);
        
        console.log(`\n Mongoose connected || DB HOST: ${connectionInstance.connection.host}`);

        
    } catch (error) {
        console.log("MONGODB connection FAILED",error);
        process.exit(1);
        
    }
}

export default connectDB;