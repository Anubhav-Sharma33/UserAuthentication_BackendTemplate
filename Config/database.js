import mongoose from "mongoose";

export default async function database(){
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log("Database connected");
    }catch(err){
        console.log("Error Occured while Connecting to database"+" "+err);
    }
}