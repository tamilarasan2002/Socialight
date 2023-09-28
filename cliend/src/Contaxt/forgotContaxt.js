import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ForgotContaxt = createContext();

export const ForgotContaxtProvider = ({ children }) =>{
    const [forgotuser,setuser] = useState('') 
    const sendOTP = async (validata) =>{
        const res = await axios.post('http://localhost:3300/api/auth/forgot',validata);
        return res
    }
    const ChangePassword = async (user) =>{
        console.log(user);
        const res = await axios.post('http://localhost:3300/api/auth/forgot',user);
        return res
    }
    
    
    return(
        <ForgotContaxt.Provider value={{ sendOTP, ChangePassword }}>
            { children }
        </ForgotContaxt.Provider>
        
    )
}