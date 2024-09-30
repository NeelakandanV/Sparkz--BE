// Importing necessary components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const AdminSchema = new mongoose.Schema({
    First_Name : {
        type : String,
        required : true
    },
    Last_Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true ,
        lowercase : true,
        validate : (value) =>{
            return validator.isEmail(value);
        }
    },
    Password : {
        type : String,
        required : true
    },
    Role :{
        type : String,
        default : "Admin"
    },
    ResetPin : {
        type : String
    },
    Access : {
        type : String,
        default : "Granted"
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
},{
    versionKey : false,
})

const Admins = mongoose.model("admins",AdminSchema);// Third Argument is the forced collection name
export default Admins;