// Importing necessary components
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Customers from "../Models/CustomerSchema.js";
import Colors from "../Models/ColorSchema.js";
import DailyColors from "../Models/DailyColorSchema.js";
import MonthColors from "../Models/MonthColorSchema.js";


// For Admin Dashboard - Get
export const AdminDashboard = async(req,res)=>{
    try{
        const Customer_Count = await Customers.countDocuments();
        const Color_Count = await Colors.countDocuments();
        const Today = new Date()+"";
        const To_Date = Today.split(" ")[2];
        const To_Month = Today.split(" ")[1];
        const Today_Color = await DailyColors.find({Date:To_Date});
        const Month_Color = await MonthColors.find({Month:To_Month});
        res.status(200).send({message:"Data fetch successful",Cust : Customer_Count,Total_Colors:Color_Count,Daily_Color:Today_Color,Monthly_Color:Month_Color})
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Fetch all customers  - Get
export const Get_Customers = async(req,res)=>{
    try{
        const Customer_Count = await Customers.countDocuments();
        const Customer_Data = await Customers.find();
        if(Customer_Data){
            res.status(200).send({message:"Data Fetched Successfully",Count:Customer_Count,Customer_Data})
        }
        else{
            res.status(400).send({message:"No Data Found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}



// For Colors

// Fetch all Colors available  - Get
export const Get_Colors = async(req,res)=>{
    try{
        const Color_Count = await Colors.countDocuments();
        const Color_Data = await Colors.find();
        if(Color_Data){
            res.status(200).send({message:"Data Fetched Successfully",Count:Color_Count,Color_Data})
        }
        else{
            res.status(400).send({message:"No Data Found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Add a new Color - Post
export const Add_Color = async(req,res)=>{
    try{
        const find_Color = await Colors.find({Color_Name : req.body.Color_Name})
        if(find_Color.length<1){
            const Color_Data = await Colors.create(req.body)
            await Color_Data.save()
            res.status(200).send({message:"Color added Successfully!"})
        }
        else{
            res.status(400).send({message:"Color already exists!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Update Color - Put
export const Update_Color = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await Colors.findById(id)
        if(find_Color){
            find_Color.Color_Name = req.body.Color_Name || find_Color.Color_Name;
            find_Color.Color_Look = req.body.Color_Look || find_Color.Color_Look;
            find_Color.Fact = req.body.Fact || find_Color.Fact;
            find_Color.Mood = req.body.Mood || find_Color.Mood;
            find_Color.Season = req.body.Season || find_Color.Season;
            find_Color.Weather = req.body.Weather || find_Color.Weather;
            find_Color.Occasions = req.body.Occasions || find_Color.Occasions;
            find_Color.Image = req.body.Image || find_Color.Image;

            const updatedColor = await find_Color.save();
            res.status(200).send({message:"Color Updated!",color:updatedColor})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Get a Particular Color - Get by Id
export const getOneColor = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await Colors.findById(id)
        if(find_Color){
            const Color_Data = find_Color;
            res.status(200).send({message:"Color found!",Color_Data})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete a Color - Delete
export const DeleteColor = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await Colors.findById(id)
        if(find_Color){
            const Color_Data = await Colors.deleteOne({_id:id});
            res.status(200).send({message:"Color Deleted!"})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}




// For Daily Colors

// Fetch all Daily Colors available  - Get
export const Daily_Colors = async(req,res)=>{
    try{
        const Color_Data = await DailyColors.find();
        if(Color_Data){
            res.status(200).send({message:"Data Fetched Successfully",Color_Data})
        }
        else{
            res.status(400).send({message:"No Data Found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Add a new Daily Color - Post
export const Add_Daily_Color = async(req,res)=>{
    try{
        const find_Color = await DailyColors.find({Color_Name : req.body.Color_Name})
        const find_Date = await DailyColors.find({Date:req.body.Date})
        if(find_Date.length==1){
            res.status(400).send({message:"Date already exists!"})
        }
        else{
            if(find_Color.length<1){
                const Color_Data = await DailyColors.create(req.body);
                await Color_Data.save()
                res.status(200).send({message:"Daily Color added Successfully!"})
            }
            else{
                res.status(400).send({message:"Color already exists!"})
            }
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Update Daily Color - Put
export const Update_Daily_Color = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await DailyColors.findById(id)
        if(find_Color){
            find_Color.Color_Name = req.body.Color_Name || find_Color.Color_Name;
            find_Color.Color_Look = req.body.Color_Look || find_Color.Color_Look;
            find_Color.Fact = req.body.Fact || find_Color.Fact;
            find_Color.Image = req.body.Image || find_Color.Image;
            find_Color.Date = find_Color.Date;

            const updatedColor = await find_Color.save();
            res.status(200).send({message:"Daily Color Updated!",color:updatedColor})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete Daily Color - Delete
export const Delete_DailyColor = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await DailyColors.findById(id)
        if(find_Color){
            const Color_Data = await DailyColors.deleteOne({_id:id});
            res.status(200).send({message:"Daily Color Deleted!"})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}




// For Month Colors


// Fetch all Month Colors available  - Get
export const Month_Colors = async(req,res)=>{
    try{
        const Color_Data = await MonthColors.find();
        if(Color_Data){
            res.status(200).send({message:"Data Fetched Successfully",Color_Data})
        }
        else{
            res.status(400).send({message:"No Data Found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Add a new Month Color - Post
export const Add_Month_Color = async(req,res)=>{
    try{
        const find_Color = await MonthColors.find({Color_Name : req.body.Color_Name})
        const find_Month = await MonthColors.find({Month:req.body.Month})
        if(find_Month.length==1){
            res.status(400).send({message:"Month already exists!"})
        }
        else{
            if(find_Color.length<1){
                const Color_Data = await MonthColors.create(req.body)
                await Color_Data.save()
                res.status(200).send({message:"Month Color added Successfully!"})
            }
            else{
                res.status(400).send({message:"Color already exists!"})
            }
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Update Month Color - Put
export const Update_Month_Color = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await MonthColors.findById(id)
        if(find_Color){
            find_Color.Color_Name = req.body.Color_Name || find_Color.Color_Name;
            find_Color.Color_Look = req.body.Color_Look || find_Color.Color_Look;
            find_Color.Fact = req.body.Fact || find_Color.Fact;
            find_Color.Image = req.body.Image || find_Color.Image;
            find_Color.Month = find_Color.Month;

            const updatedColor = await find_Color.save();
            res.status(200).send({message:"Month Color Updated!",color:updatedColor})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Delete Month Color - Delete
export const Delete_MonthColor = async(req,res)=>{
    try{
        const {id} = req.params;
        const find_Color = await MonthColors.findById(id)
        if(find_Color){
            const Color_Data = await MonthColors.deleteOne({_id:id});
            res.status(200).send({message:"Month Color Deleted!"})
        }
        else{
            res.status(400).send({message:"Color not found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}
