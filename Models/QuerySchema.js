// Importing necessary Components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const QuerySchema = new mongoose.Schema({
    Name : {
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
    Query : {
        type : String,
        required : true
    },
    Ticket_No : {
        type : String
    },
    User_Id : {
        type : mongoose.Schema.Types.ObjectId,ref:'customers'
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

const Queries = mongoose.model("queries",QuerySchema)
export default Queries;