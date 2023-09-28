import { login,logout,register } from "../controllers/auth.js";
import Express from "express";
import { ForgotPassword, ResetPassword } from "../controllers/password.js";

const route = Express.Router()

    route.post("/login",login);
    route.post("/logout",logout);
    route.post("/register",register);
    route.post("/forgot",ForgotPassword);
    route.post("/forgot",ResetPassword);


export default route