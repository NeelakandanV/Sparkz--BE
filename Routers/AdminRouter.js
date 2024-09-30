// Importing necessary components
import express from "express";
import { CreateAdmin, ForgotPasswordAdmin, LoginAdmin, PasswordResetAdmin } from "../Controllers/AuthController.js";
import { Add_Color, Add_Daily_Color, Add_Month_Color, AdminDashboard, Daily_Colors, Delete_DailyColor, Delete_MonthColor, DeleteColor, Get_Colors, Get_Customers, getOneColor, Month_Colors, Update_Color, Update_Daily_Color, Update_Month_Color } from "../Controllers/AdminController.js";
import { isAdmin, Validate } from "../Utils/Auth.js";




const router = express.Router();

// Auth Routers
router.post("/Login",LoginAdmin)
router.post("/Register",CreateAdmin)
router.put("/ForgotPassword",ForgotPasswordAdmin)
router.put("/ResetPassword/:id/:pin/:token",PasswordResetAdmin)

// Dashboard and Customers
router.get("/Dashboard",Validate,isAdmin,AdminDashboard)
router.get("/Customers",Validate,isAdmin,Get_Customers)

// Colors
router.get("/Colors",Validate,isAdmin,Get_Colors)
router.post("/AddColor",Validate,isAdmin,Add_Color)
router.put("/UpdateColor/:id",Validate,isAdmin,Update_Color)
router.get("/GetColor/:id",Validate,isAdmin,getOneColor)
router.delete("/DeleteColor/:id",Validate,isAdmin,DeleteColor)

// Daily Colors
router.get("/DailyColor",Validate,isAdmin,Daily_Colors)
router.post("/AddDailyColor",Validate,isAdmin,Add_Daily_Color)
router.put("/UpdateDailyColor/:id",Validate,isAdmin,Update_Daily_Color)
router.delete("/DeleteDailyColor/:id",Validate,isAdmin,Delete_DailyColor)

// Month Colors
router.get("/MonthColor",Validate,isAdmin,Month_Colors)
router.post("/AddMonthColor",Validate,isAdmin,Add_Month_Color)
router.put("/UpdateMonthColor/:id",Validate,isAdmin,Update_Month_Color)
router.delete("/DeleteMonthColor/:id",Validate,isAdmin,Delete_MonthColor)

export default router;