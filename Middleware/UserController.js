import bcrypt from "bcrypt";
import {User} from '../model/userModal.js';
import { saltRound } from "../index.js";
import jwt from "jsonwebtoken";


export const createUser =  async(req,res,next)=>{
    const {username,password,email} = req.body;
    const payload = {email,username};
    try{
        const response = await User.find({email:email}).exec();
        if(response.length === 0){
            const hashedPassword = await bcrypt.hash(password,saltRound);
            const newUser = new User({
                email:email,
                username:username,
                password:hashedPassword
            })
            await newUser.save();
            const token = jwt.sign(payload,process.env.Secret_Key,{expiresIn:'1h'});
            res.status(200).json({message:"User Created",token});
        }else{
            res.status(409).json({message:"Email Already exists"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Cannot Procced currently with your request");
    }
    //Check for the email if it exits Done
    //if Same email send a response with same email exists Done
    //create a instance inside database and respond with user generated Done
    //Hash the password before storing inside the database using bcrypt Done
    //Find a way store session storage Done by sending back the username and passworrd to be stored
    //Construct payload from req.body
    //Generate token if email not registered
    //Send back token with successfull message
}

export async function getUserInfo(req,res,next){
    const {email,password,username} = req.body;
    const token = req.headers.authorization;
    if(token){
        try{
            jwt.verify(token,process.env.Secret_Key); 
            res.status(200).json({message:"Verified Token",token})
        }catch(error){
            console.log(error);
            res.status(404).json({message:"Authentication Failed"})
        }
    }else{
        try{
            const response = await User.find({email:email}).exec();
            if(response.length !== 0){
                const curUser = response[0];
                const match = await bcrypt.compare(password, curUser.password);
                if(match){
                    const payload = {username,email};
                    const token = jwt.sign(payload,process.env.Secret_Key,{expiresIn:'1h'});
                    res.status(200).json({message:"Successfull SignIn",token})
                }else{
                    res.status(400).json({message:"Password is Incorrect"});
                }
            }else{
                res.status(400).json({message:"Not able to find user with email"});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Sorry Cannot process your request right now"})
        }
    }
    
    // We get the UserCredentials from the form  Done
    // Extarct that info find the username if exist Done
    //if user Exist we verify the password with bycrpt Done
    //If password verified we send then cred and store and send message of  sign in success Done
    //if not we say worng password Done
    //If user not exits we say them to signup Done
    // If token exist then verified b verify method
    // If token donot exists then checked for password is correct and returned back token

}