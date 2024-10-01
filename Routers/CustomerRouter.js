// Importing necessary components
import express from "express";
import { Check, CreateCustomer, ForgotPassword, LoginCustomer, PasswordReset, verifyUser, VerifyUserLink } from "../Controllers/AuthController.js";
import { Validate } from "../Utils/Auth.js";
import { Color_To_Favorite, Customer_Care, CustomerDashboard, Delete_Account, Delete_otp, DelFav_ByColor, Fav_ByColor, GetRewards, MyFavorites_List, Remove_From_Favorites, Suggestion, Suggestion_ByMood, Suggestion_ByOccasions, Suggestion_BySeason, Suggestion_ByWeather, Update_Profile } from "../Controllers/CustomerController.js";



const router = express.Router();


// Auth Routers
router.get("/",Check)
router.post("/Login",LoginCustomer)
router.post("/Register",CreateCustomer)
router.put("/ForgotPassword",ForgotPassword)
router.put("/ResetPassword/:id/:pin/:token",PasswordReset)
router.put("/VerifyAccount",VerifyUserLink)
router.get("/VerifyUser/:id/:pin/:token",verifyUser)

// Dashboard and Profile
router.get("/Dashboard",Validate,CustomerDashboard)
router.put("/UpdateProfile",Validate,Update_Profile)

// Suggestions
router.get("/Suggestions",Suggestion)
router.get("/SuggestByMood/:id",Validate,Suggestion_ByMood)
router.get("/SuggestByWeather/:id",Validate,Suggestion_ByWeather)
router.get("/SuggestByOccasions/:id",Validate,Suggestion_ByOccasions)
router.get("/SuggestBySeason/:id",Validate,Suggestion_BySeason)


// Color to Favorites
router.put("/ColorToFavorite/:id",Validate,Color_To_Favorite)
router.put("/RemoveColor/:id",Validate,Remove_From_Favorites)


// Favorites
router.get("/Favorites",Validate,MyFavorites_List)
router.post("/AddFavorite",Validate,Fav_ByColor)
router.delete("/DeleteFavorite/:id",Validate,DelFav_ByColor)

// Customer Care
router.post("/CustomerCare",Validate,Customer_Care)

// Referral and Rewards
router.get("/Rewards",Validate,GetRewards)

router.put("/DeleteOtp",Validate,Delete_otp)
router.delete("/DeleteAccount/:id",Validate,Delete_Account)

export default router;