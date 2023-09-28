import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login.js';
import Signup from './Register/Signup.js';
import Home from './Home/Home.js';
// import Cookies from 'js-cookie';
import { AuthContaxt } from './Contaxt/authContaxt.js';
import Forgot from './Forgot/Forgot.js';


const Routers = () => {
    const { LoginAuth } = useContext( AuthContaxt );
   

  return (
    <BrowserRouter>
       
        {
            !LoginAuth ?  
            <Routes>     
                <Route path='/' element={<Login />}></Route> 
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/forgot_password' element={<Forgot/>} />
                
            </Routes>:
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='*' element={ <Navigate to="/" /> } />
                       
        </Routes>
        }
            
            
        
    </BrowserRouter>
    )
}

export default Routers
