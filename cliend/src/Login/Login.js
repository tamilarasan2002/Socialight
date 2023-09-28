import React, { useContext, useEffect, useState } from 'react';
import Login_image from '../assets/home-phones.png';
import Login_screen from '../assets/screenshot.png';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContaxt } from '../Contaxt/authContaxt';
import Emailvalidation from '../global/Emailvalidation';
// const Login_image = require('../assets/home-phones.png')

const Login = () => {
    const [userdata,setUserdata] = useState({});
    const [logindata,setLogindata] = useState({});
    // const [error,setError] = useState(null);

    useEffect(()=>{
        setLogindata(userdata)
    },[userdata])
    const { login } = useContext ( AuthContaxt )
    const { Loginmsg } = useContext ( AuthContaxt )

    const navigate = useNavigate();
   
    const handelUserData = (data) =>{
            setUserdata(preview=>({...preview, [data.target.name]:data.target.value}))
            // console.log(data.target.value);
       }

   

   const checkValidation = async() =>{
    const validata = Emailvalidation(userdata)
        setLogindata(validata)
        await login(validata)

        console.log(validata);
              
        navigate('/')

        // window.location.reload();
   }


  return (
    <div className='login_page row_center'>
    <div className='container pt-5  pb-5'>
    <div className='row row_center align-items-start'>
        <div className='col-lg-5 col-sm-11 col-md-6'>
         <div className='login_img_card'>
            <div className='position-relative'>
                <img src={Login_image} className=''  alt='playstore'/>
                <img src={Login_screen} className='login_image_setup' alt='playstore'></img>
            </div>
         </div>
        </div>
        <div className='col-lg-4 col-sm-11 col-md-6'>
        <div className='login_form_card '>
            <div className=''>
                <h1 className='text-center mt-3 mb-4'>Socialight</h1>
                <div className='login_form'>
                    <from className="">
                        <div className='mb-3'>
                            <input 
                                className='form-control' 
                                name='username' 
                                placeholder='Username or email'
                                onChange={ handelUserData }            
                                                                
                            />
                        </div>
                        <div className='mb-3'>
                            <input 
                                className='form-control' 
                                name='password' 
                                type='password' 
                                placeholder='Password'
                                onChange={handelUserData}
                            />
                        </div>
                         { Loginmsg ? <p className='mb-2 text-center'>{Loginmsg}</p> : null } 
                        <div className='mb-3'>
                            <button onClick={checkValidation} className='btn btn-primary'> Login</button>
                        </div>
                    </from>
                    <div className='row_evenly mt-4'>
                        <div className='stright_line'></div>
                        <div className='stright_line_text' > OR </div>
                        <div className='stright_line'></div>
                    </div>
                </div>
                <div>
                    <p className='text-center m-0'><Link to={"/forgot_password"}>  Forgot Password? </Link></p>
                </div>                 
            </div>
            <div className='text-center mt-3 p-3'>
                <span >Don't have an account? <Link to={"/register"}> Sign up </Link></span>
            </div>
         </div>
        </div>
    </div>
    
</div>
    </div>
  )
}
export const validate = Login.validatedata
export default Login
    