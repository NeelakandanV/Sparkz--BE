// Importing necessary Components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const CustomerSchema = new mongoose.Schema({
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
    Status :{
        type : String,
        default : "Not Verified"
    },
    SkinTone : {
        type : String,
    },
    ReferralCode : {
        type : String,
    },
    RewardPoints : {
        type : Number,
    },
    VerifyPin : {
        type : String
    },
    ResetPin : {
        type : String
    },
    DeletePin : {
        type : String
    },
    MyFavorites : [{
        type : mongoose.Schema.Types.ObjectId,ref:'favorites'
    }],
    FavoriteColors : [{
        type : mongoose.Schema.Types.ObjectId,ref:'colors'
    }],
    InviteCode : {
        type : String
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
    versionKey : false
})

const Customers = mongoose.model("customers",CustomerSchema);
export default Customers;