# Sparkz - Dress Color Suggestor for Women

## This documentaion provides details about the Dress Color Suggestion workflow for Women, implemented using Node.js and Express with tokenized requests and role based validations.
## Special Features - ***Two Factor Authentication(2FA)***

### Implemented with two Aspects:-
***For Admin*** - To Create,Update and Manage Color Suggestion for Users.And To get Customer Data.(No access to modify Customer Data).<br/>
***For Customers*** - To get Daily Color Suggestions,having their own favorites and get suggestions based on various factors like Mood,Season,Weather and Occasions.


# URL - [Website Url](https://sparkz.onrender.com/)
# Live Demo - [Live Site](https://sparkz1.netlify.app/)
## Frontend Source Code Link - [Github Link](https://github.com/NeelakandanV/Sparkz-Fe)

## Features :-

***bcryptjs*** - For Password hashing,your data is safe and secure.<br/>
***JWT*** - For tokenized requests and role based authorizations in our website.<br/>
***Nodemailer*** - For sending mails for verification and Password Resets.</br>

## Note: Since I'm deployed the apis in render's free tier, The initial request is taking time, Please wait little longer for initial request

# API Endpoints:-

# For Admins
### Only admins are authorized to access the below URLs. 

### Base Url
## https://sparkz.onrender.com/ - Get method
Description : This will Check whether the server is working fine or not.

### Login
## https://sparkz.onrender.com/Admin/Login - Post method
Description : Only allow Admins to log in.

### Signup
## https://sparkz.onrender.com/Admin/Register - Post method
Description : Allow Admin to register their account.

### Forgot Password
## https://sparkz.onrender.com/Admin/ForgotPassword - Put method
Description : Send a Link to their Email to reset Password.

### Reset Password
## https://sparkz.onrender.com/Admin/ResetPassword/:id/:pin/:token - Put method
Description :On Verifying the link,This will allow Admin to reset their password.
(id - User Id , pin - Reset Pin , token - Token)

### Dashboard
## https://sparkz.onrender.com/Admin/Dashboard - Get method
Description : Fetch details about the Customers and Colors.

### Customer Data
## https://sparkz.onrender.com/Admin/Customers - Get method
Description : Fetch all Customers data.(Only for viewing purpose).

### Colors Data
## https://sparkz.onrender.com/Admin/Colors - Get method
Description : Fetch all Colors data.

### For Adding a Color
## https://sparkz.onrender.com/Admin/AddColor - Post method
Description : Allows Admin to add colors for Suggesting to users.

### View Particular Color
## https://sparkz.onrender.com/Admin/GetColor/:id - Get method
Description : Get Detailed view of a Particular Color.
(id - Color Id)

### Update a Color
## https://sparkz.onrender.com/Admin/UpdateColor/:id - Put method
Description : Update a Particular Color for Suggestion.
(id - Color Id)

### Delete a Color
## https://sparkz.onrender.com/Admin/DeleteColor/:id - Delete method
Description : Delete a Particular Color.
(id - Color Id)

### To get all Colors based on Date
## https://sparkz.onrender.com/Admin/DailyColor - Get method
Description : Get all colors based on date.

### To add color for a date.
## https://sparkz.onrender.com/Admin/AddDailyColor - Post method
Description : To add color for a particular date.

### To update color for a date
## https://sparkz.onrender.com/Admin/UpdateDailyColor/:id - Put method
Description : Update color for a particular date.
(id - Color Id)

### To delete a color of a date
## https://sparkz.onrender.com/Admin/DeleteDailyColor/:id - Delete method
Description : To delete color of a date.
(id - Color Id)

### To get all Colors based on Month
## https://sparkz.onrender.com/Admin/MonthColor - Get Method
Description : Get all colors based on Month.

### To add color for a Month.
## https://sparkz.onrender.com/Admin/AddMonthColor - Post method
Description : To add color for a particular Month.

### To update color for a Month
## https://sparkz.onrender.com/Admin/UpdateMonthColor/:id  - Put method
Description : Update  color for a particular Month.
(id - Color Id)

### To delete a color of a Month
## https://sparkz.onrender.com/Admin/DeleteMonthColor/:id - Delete method
Description : To delete color of a date.
(id - Color Id)


# For Customers

### Login
## https://sparkz.onrender.com/Login - Post method
Description : Allows only Registered and Verified Customers to log in.

### Signup
## https://sparkz.onrender.com/Register - Post method
Description : Allows new users to register in the portal

### Forgot Password
## https://sparkz.onrender.com/ForgotPassword - Put method
Description : Send a reset link to the registered users for reseting their passwords.

### Reset Password
## https://sparkz.onrender.com/ResetPassword/:id/:pin/:token  - Put method
Description : On Verifying the link,This will allow customers to reset their password.
(id - User Id , pin - Reset Pin , token - Token)

### Verify Link
## https://sparkz.onrender.com/VerifyAccount - Put method
Description : Send a verification link to the registered but not verified customers.

### Account Verification 
## https://sparkz.onrender.com/VerifyUser/:id/:pin/:token  - Get method
Description : After Verifying the link,this will change user status as verified.
(id - User Id , pin - VerifyPin , token - Token)

### Dashboard
## https://sparkz.onrender.com/Dashboard - Get method
Description : This will fetch Color of the day and Color of the Month to display to Customers.

### Update Profile
## https://sparkz.onrender.com/UpdateProfile - Put method
Description : This will allow customers to update their details except email used to register and Password.

### Fetch all available Colors
## https://sparkz.onrender.com/Suggestions - Get method
Description : This will fetch all available colors.

### Fetch color by mood
## https://sparkz.onrender.com/SuggestByMood/:id - Get method
Description : This will fetch Colors based on your mood.
(id - mood)

### Fetch color by weather
## https://sparkz.onrender.com/SuggestByWeather/:id - Get method
Description : This will fetch Colors based on weather.
(id - weather)

### Fetch color by season
## https://sparkz.onrender.com/SuggestBySeason/:id - Get method
Description : This will fetch Colors based on weather.
(id - weather)

### Fetch color by occasions
## https://sparkz.onrender.com/SuggestByOccasions/:id - Get Method
Description : This will fetch Colors based on occasions.
(id - occasions)

### Add available Color to Favorites
## https://sparkz.onrender.com/ColorToFavorite/:id - Put method
Description : Add to favorites from available Colors.
(id - Color Id)

### Remove available Color from favorites
## https://sparkz.onrender.com/RemoveColor/:id - Put method
Description : Remove Color from favorites added from available colors.
(id - Color Id)

### Fetch data from favorites
## https://sparkz.onrender.com/Favorites - Get method
Description : This will fetch all data from favorites.

### Add your own data to favorites
## https://sparkz.onrender.com/AddFavorite
Description : This will allow you to add your own dress name and color.

### Delete your data from favorites
## https://sparkz.onrender.com/DeleteFavorite/:id - Delete method
Description : This will delete your added data from favorites.
(id - Dress Id)

### Customer Care
## https://sparkz.onrender.com/CustomerCare - Post method
Description : This will send a detailed email to the Customer with Ticket number consisting details of their query and the same will be received in our database.

### Customer Rewards
## https://sparkz.onrender.com/Rewards - Get method
Description - This will get the referral code and reward points of the customer.Reward points will gets added whenever an user register with a Customer's referral code.

### OTP for confirming identity
## https://sparkz.onrender.com/DeleteOtp - Put method
Description : OTP will be sent to the customer's Email for confirming the account.

### Deleting Account
## https://sparkz.onrender.com/DeleteAccount/:id - Delete method
Description : OTP received in mail should be matched with entered OTP for deleting your account.
(id - OTP)
