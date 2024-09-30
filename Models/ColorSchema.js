// Importing necessary components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const ColorSchema = new mongoose.Schema({
    Color_Name :{
        type : String,
        required : true
    },
    Image : {
        type : String,
        required : true
    },
    Color_Look : {
        type : String,
        required : true
    },
    Mood : [{
        type : String,
        required : true
    }],
    Season : [{
        type : String,
        required : true
    }],
    Weather : [{
        type : String,
        required : true
    }],
    Occasions : [{
        type : String,
        required : true
    }],
    Fact : {
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

const Colors = mongoose.model("colors",ColorSchema);
export default Colors;