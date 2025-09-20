import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";
//TODO
const app = express();
const allowedOrigins = [
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
            /*
            null → No error occurred during origin check.(this is for error checking)

            true → The provided origin is allowed to access the resource.(this is for saying allowed to acces the resource)
            */
        }
        else{
            // console.log("Blocked Cors origing:", origin);
            
            callback(new Error("Not allowed CORS"));
        } 
    },

    credentials: true,
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser());



import foodRouter from "./routes/foodRoute.js"; 
import userRouter from "./routes/userRoute.js";  
import cartRouter from "./routes/cartRoute.js";  
import orderRouter from "./routes/orderRoute.js"; 


app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);




//if need to debugging then comment below line -> it is error stack trace and given html format
app.use((err, req, res, next) => {
//   console.error("Caught error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.ApiError : undefined,
  });
});

//https://localhost:4000/api/v1/teacher/register

export { app };
/*
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
*/