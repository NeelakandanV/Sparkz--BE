// Importing Dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import DBconnect from "./Utils/dbConfig.js";
import requestLogger from "./Utils/logger.js";
import unknownEndpoint from "./Utils/Error.js";
import CustomerRouter from "./Routers/CustomerRouter.js";
import AdminRouter from "./Routers/AdminRouter.js";


// Applying Middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());


// for cors
const allowedOrigins = ['http://localhost:5000'];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

//Connecting  to Database
DBconnect();

//Routes
app.use("/",CustomerRouter)
app.use("/Admin",AdminRouter)
app.all("*",unknownEndpoint)


const Port = process.env.PORT || 9000;
app.listen(Port,()=>console.log(`App is listening on ${Port}`))