import express from "express";
import userroute from "./routes/users.js"
import authroute from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(
    cors({
        origin:"http://localhost:3000"
    }))

app.use(cookieParser());


app.use("/api/users/",userroute)
app.use("/api/auth/",authroute)

app.listen(3300, ()=>{
    console.log("Api Working");
})