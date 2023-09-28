import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import playstore from "../assets/playtore.png"
import appstore from "../assets/appstore.png";
import "./signup.scss"
// import axios from 'axios';
import { AuthContaxt } from '../Contaxt/authContaxt';

const Signup = () => {
    const [signupData,setData] = useState({});
    const { Signup } = useContext( AuthContaxt );
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const handelData = (e) => {
        setData(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    console.log(signupData);
    const CreateUser = () => {
        
        setError(Signup(signupData));
        navigate("/")
        
        }


  return (
    <div className='login_page row_center'>
    <div className='container pt-5  pb-5'>
    <div className='row row_center align-items-start'>
        <div className='col-lg-4 col-sm-11 col-md-6'>
        <div className='login_form_card '>
            <div className=''>
                <h1 className='text-center mb-0'>Socialight</h1>
                <div className='login_form'>
                   <div className='text-center m-3 fw-bolder text-secondary'> <span> Sign up to see photos and videos from your friends.</span></div>
                    <from className="">

                        <div className='mb-2'>
                            <input className='form-control' name='email' onChange={handelData} placeholder='Email'/>
                        </div>

                        <div className='mb-2'>
                            <input className='form-control' name='name'  onChange={handelData} placeholder='Full Name'/>
                        </div>

                        <div className='mb-2'>
                            <input className='form-control' name='username'  onChange={handelData}  placeholder='Username'/>
                        </div>
                        <div className='mb-3'>
                            <input className='form-control' name='password'  onChange={handelData} placeholder='Password'/>
                        </div>
                         {error ? <p className='mb-2 text-center'>{error}</p> : null} 
                        <div className='mb-2'>
                            <button onClick={ CreateUser} className='btn btn-primary'>Sign up </button>
                        </div>

                    </from>
                    
                    {/*<div className='row_evenly mt-4'>
                        <div className='stright_line'></div>
                        <div className='stright_line_text' > OR </div>
                        <div className='stright_line'></div>
                    </div>*/}
                    
                </div>
                
                                
            </div>
            <div className='text-center mt-3 p-3'>
                        <span >Don't have an account? <Link to={"/"}> Log in </Link></span>
            </div>
           
         </div>
         <div className='sigup_footer'>
            <div className='row row_evenly mt-3'>
                <div className='col-5'>
                    <img src={playstore}  alt='playstore'/>
                </div>
                <div className='col-5'>
                    <img src={appstore} alt='appstror'/>
                </div>
            </div>
         </div>
        </div>
    </div>
    
</div>
    </div>
  )
}

export default Signup
