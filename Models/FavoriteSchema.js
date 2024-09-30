// Importing Necessary Components
import mongoose from "mongoose";
import validator from "validator";


// Validation Schema
const FavoriteSchema = new mongoose.Schema({
    DressName : {
        type : String,
        required : true
    },
    DressColor : {
        type : String,
        required : true
    },
    Occasion: {
        type : String
    },
    Mood : {
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

const Favorites = mongoose.model("favorites",FavoriteSchema);
export default Favorites;