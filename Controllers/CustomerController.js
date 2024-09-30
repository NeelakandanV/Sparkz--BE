// Importing necessary components
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Customers from "../Models/CustomerSchema.js";
import Colors from "../Models/ColorSchema.js";
import DailyColors from "../Models/DailyColorSchema.js";
import MonthColors from "../Models/MonthColorSchema.js";
import Favorites from "../Models/FavoriteSchema.js";
import Queries from "../Models/QuerySchema.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// For Customer Dashboard  - Get
export const CustomerDashboard = async(req,res)=>{
    try{
        const Color_Count = await Colors.countDocuments();
        const Today = new Date()+"";
        const To_Date = Today.split(" ")[2];
        const To_Month = Today.split(" ")[1];
        const Today_Color = await DailyColors.find({Date:To_Date});
        const Month_Color = await MonthColors.find({Month:To_Month});
        res.status(200).send({message:"Data fetch successful",Total_Colors:Color_Count,Daily_Color:Today_Color,Monthly_Color:Month_Color})
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// For Updating Profile - Update
export const Update_Profile = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_User = await Customers.findById(data.Id)
        if(find_User){
            find_User.First_Name = req.body.First_Name || find_User.First_Name;
            find_User.Last_Name = req.body.Last_Name || find_User.Last_Name;
            find_User.Email = find_User.Email;
            find_User.Password = find_User.Password; 
            find_User.SkinTone = req.body.SkinTone || find_User.SkinTone;

            const UpdatedUser = await find_User.save();
            res.status(200).send({message:"Profile Updated!",UpdatedUser})
        }
        else{
            res.status(400).send({message:"User not Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// All Suggestions - Get
export const Suggestion = async(req,res)=>{
    try{
        const find_AllColor = await Colors.find();
        if(find_AllColor){
            res.status(200).send({message:"Colors fetch Successful!",find_AllColor})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Suggestion By Mood - Get
export const Suggestion_ByMood = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_MoodColor = await Colors.find({Mood:id});
        if(find_MoodColor.length>0){
            res.status(200).send({message:"Colors fetch Successful!",find_MoodColor})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Suggestion By Weather - Get
export const Suggestion_ByWeather = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_WeatherColor = await Colors.find({Weather:id});
        if(find_WeatherColor.length>0){
            res.status(200).send({message:"Colors fetch Successful!",find_WeatherColor})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Suggestion By Season - Get
export const Suggestion_BySeason = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_SeasonColor = await Colors.find({Season:id});
        if(find_SeasonColor.length>0){
            res.status(200).send({message:"Colors fetch Successful!",find_SeasonColor})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Suggestion By Occasions - Get
export const Suggestion_ByOccasions = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_OccasionsColor = await Colors.find({Occasions:id});
        if(find_OccasionsColor.length>0){
            res.status(200).send({message:"Colors fetch Successful!",find_OccasionsColor})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Adding Color to Favorites  - Put
export const Color_To_Favorite = async(req,res)=>{
    try{
        const {id} = req.params;
        const getColor = await Colors.findById(id)
        if(getColor){
            const token = req.cookies.token || req.headers.authorization.split(" ")[1];
            const data = await jwt.decode(token)
            const getFavo = await Customers.find({_id:data.Id,FavoriteColors:id})
            if(getFavo.length<1){
                await Customers.findByIdAndUpdate({_id:data.Id},{$push:{ FavoriteColors:getColor._id}})
                res.status(200).send({message:"Color added to favorites!"})
            }
            else{
                res.status(400).send({message:"Color already added to Favorites!"})
            }
        }
        else{
            res.status(400).send({message:"Color not Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Remove Color from Favorites - Put
export const Remove_From_Favorites = async(req,res)=>{
    try{
        const {id} = req.params;
        const getColor = await Colors.findById(id)
        if(getColor){
            const token = req.cookies.token || req.headers.authorization.split(" ")[1];
            const data = await jwt.decode(token)
            await Customers.findByIdAndUpdate({_id:data.Id},{$pull:{FavoriteColors:getColor._id}})
            res.status(200).send({message:"Color removed Successfully!"})
        }
        else{
            res.status(400).send({message:"Color not Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}




// For Favorites.

// Get Favorites
export const MyFavorites_List = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const getFavorites = await Favorites.find({User_Id:data.Id});
        const getFavoriteColors = await Customers.findById(data.Id).populate('FavoriteColors');
        console.log(getFavoriteColors)
        if((getFavorites.length>0 && getFavoriteColors.length>0) || (getFavorites.length>0|| getFavoriteColors.length>0)){
            res.status(200).send({message:"Data Fetch Success!",getFavoriteColors,getFavorites})
        }
        else{
            res.status(400).send({message:"No Data Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Add Favorite by Color
export const Fav_ByColor = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const Find_Dress = await Favorites.find({DressName:req.body.DressName,User_Id:data.Id})
        if(Find_Dress.length<1){
            req.body.User_Id = data.Id;
            const Add_Dress = await Favorites.create(req.body)
            await Add_Dress.save();
            await Customers.findByIdAndUpdate({_id:data.Id},{$push:{ MyFavorites:Add_Dress._id}})
            res.status(200).send({message:"Added to Favorites",Add_Dress})
        }
        else{
            res.status(400).send({message:"Dress with same name already exists!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete Favorite by Color
export const DelFav_ByColor = async(req,res)=>{
    try{
        const {id} = req.params;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const Find_Dress = await Favorites.findById(id)
        if(Find_Dress){
            const Delete_Dress = await Favorites.deleteOne({_id:id})
            await Customers.findByIdAndUpdate({_id:data.Id},{$pull:{ MyFavorites:id}})
            res.status(200).send({message:"Dress deleted from Favorites!"})
        }
        else{
            res.status(400).send({message:"Favorite Dress not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}



// Customer Care - Post
export const Customer_Care = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        if(req.body.Query){
            req.body.Name = data.First_Name;
            req.body.Email = data.Email;
            req.body.User_Id = data.Id;

            // Generating a random string
            const new_num = Math.random()*100000;
            const new_ticket = Math.floor(new_num);

            req.body.Ticket_No = new_ticket;
            
            const Complaint = await Queries.create(req.body);
            await Complaint.save()

            // for Sending mails - nodemailer
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hari1507hari@gmail.com',
                  pass: process.env.MAILPASS
                }
              });
              
              var mailOptions = {
                from: 'hari1507hari@gmail.com',
                to: data.Email,
                subject: 'Raised a Query on Sparkz',
                html:`<p>Your Query is received.We will revert back to you ASAP! <b>Your Query Ticket No : ${Complaint.Ticket_No}</b></p><p>Your Query Details : ${Complaint.Query}</p></br><p>We would like to serve you anytime.Please feel free to contact us.Raise a ticket on our Platform ,we would revert back to you ASAP!</p></br><p>With love💙 Sparkz Team</p>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  res.status(400).send(error)
                } else {
                    res.status(200).send({message : `Query raised with Ticket number ${Complaint.Ticket_No}`, "Mail" : info.response})
                }
            });
        }
        else{
            res.status(400).send({message:"Query should not be empty!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}



// Rewards and Referrals - Get
export const GetRewards = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const user = await Customers.findById(data.Id)
        if(user){
            res.status(200).send({message:"Rewards fetched!",user})
        }
        else{
            res.status(400).send({message:"No Rewards Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete OTP
export const Delete_otp = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const user = await Customers.findById(data.Id)
        if(user){
             // Generating a random string
             const new_num = Math.random()*1000000;
             const new_Otp = Math.floor(new_num);
            
             //Updating Delete String in Db
            const UpdateDeleteString = await Customers.updateOne({Email :data.Email},{$set:{DeletePin : new_Otp}})
            
             // for Sending mails - nodemailer
             var transporter = nodemailer.createTransport({
                 service: 'gmail',
                 auth: {
                   user: 'hari1507hari@gmail.com',
                   pass: process.env.MAILPASS
                 }
               });
               
               var mailOptions = {
                 from: 'hari1507hari@gmail.com',
                 to: data.Email,
                 subject: 'OTP for Deleting Sparkz account',
                 html:`<p>We feel sad that you are leaving us! You still have a chance to continue your journey with us!!<b>OTP for deleting your account: ${new_Otp}</b></p></br><p>We would like to serve you anytime.Please feel free to contact us.Raise a ticket on our Platform ,we would revert back to you ASAP!</p></br><p>Anyway we respect your decision.You can rejoin us anytime in the future!</p></br><p>With love💙 Sparkz Team</p>`
               };
               
               transporter.sendMail(mailOptions, function(error, info){
                 if (error) {
                   res.status(400).send(error)
                 } else {
                     res.status(200).send({message : `OTP sent to ${data.Email}`, "Mail" : info.response})
                 }
             });
        }
        else{
            res.status(400).send({message:"User not Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete Customer Account
export const Delete_Account = async(req,res)=>{
    try{
        const {id}= req.params;
        if(id){
            const token = req.cookies.token || req.headers.authorization.split(" ")[1];
            const data = await jwt.decode(token)
            const user = await Customers.findById(data.Id)
            if(user){
                if(user.DeletePin == id){
                    const DelFavor = await Favorites.deleteMany({User_Id:data.Id})
                    const DelAccount = await Customers.deleteOne({_id:data.Id})
                    res.status(200).send({message:"Account deleted Successfully!"})
                }
                else{
                    res.status(400).send({message:"OTP not matched!"})
                }
            }
            else{
                res.status(400).send({message:"User not Found!"})
            }
        }
        else{
            res.status(400).send({message:"OTP required!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}
