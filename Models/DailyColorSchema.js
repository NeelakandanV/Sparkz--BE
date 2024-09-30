// Importing necessary components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const DailyColorSchema = new mongoose.Schema({
    Color_Name : {
        type : String,
        required : true
    },
    Image : {
        type : String,
        required : true
    },
    Color_Look :{
        type: String,
        required : true
    },
    Date : {
        type : String,
        required : true
    },
    Fact : {
        type : String,
        required : true
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

const DailyColors = mongoose.model("dailycolors",DailyColorSchema);
export default DailyColors;