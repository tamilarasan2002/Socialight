import axios from "axios";
import { createContext, useEffect, useState } from "react";

 const AuthContaxt = createContext();

 const AuthContaxtProvider = ({ children }) =>{

        const [Loginmsg,setLoginmsg] = useState(null);
        const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
        const [LoginAuth,setLoginAuth] = useState( JSON.parse(localStorage.getItem('loginAuth')) || null);

        // useEffect(()=>{
        //     // localStorage.setItem("user",JSON.stringify(currentUser));
        //     // localStorage.setItem("loginAuth",JSON.stringify(LoginAuth))
        // },[currentUser,LoginAuth])

        useEffect(()=>{
            if(currentUser !== null){
                localStorage.setItem("user",JSON.stringify(currentUser));
            }
            if(LoginAuth !== null){
                localStorage.setItem("loginAuth",JSON.stringify(LoginAuth))
            }  
        },[LoginAuth,currentUser])
       
       const login = async(userdata) =>{
            const res = await axios.post("http://localhost:3300/api/auth/login",userdata,{
                withCredentials:true
            })
            setLoginmsg(res.data.err);
            if (res.data.err === null) {
                setCurrentUser(res.data.msg);
                setLoginAuth(res.data.auth);
                console.log(res.data.auth);
            }
        }
         const Signup = (signupData) => {
                 axios.post('http://localhost:3300/api/auth/register',signupData,{
                    withCredentials:true
                 }).then((res) => {
                console.log(res.data); 
                setCurrentUser(res.data.data);
                setLoginAuth(res.data.auth)
                return res.data.err
            })
         }


        return(
            <AuthContaxt.Provider value={{ login, currentUser, LoginAuth, Loginmsg ,Signup }}>
                { children }
            </AuthContaxt.Provider>
            
        )

}
export { AuthContaxt, AuthContaxtProvider }