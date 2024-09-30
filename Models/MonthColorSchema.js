// Importing necessary components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const MonthColorSchema = new mongoose.Schema({
    Color_Name : {
        type : String,
        required : true
    },
    Image : {
        type : String,
        required : true
    },
    Color_Look :{
        type: String
    },
    Month : {
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

const MonthColors = mongoose.model("monthcolors",MonthColorSchema);
export default MonthColors;