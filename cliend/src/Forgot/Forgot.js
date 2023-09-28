import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import './forgot.scss';
import Emailvalidation from '../global/Emailvalidation';
import axios from 'axios';
import Otp from './Otp';
import { ForgotContaxt } from '../Contaxt/forgotContaxt';



const Forgot = () => {
    const [userdata, setdata] = useState();
    const [error, setError] = useState(null);
    const [ispassword, setispassword] = useState(false);
    const [isOtp, setisOtp] = useState(false);
    const { sendOTP } = useContext(ForgotContaxt)
   
    // console.log(validatedata({"username":"tamil"}));

    const handelChange = (e) =>{
        setdata(priv=>({...priv, [e.target.name]:e.target.value}))
    }
    const handeldata = async () => {
        const verifydata = Emailvalidation(userdata);
        const {password,...validata }= verifydata
        setdata(validata);
        setError(null);
        const res = await sendOTP(validata);
        setispassword(res.data.otp ? true : false)
        setError(res.data.err);
        alert(res.data.otp);
        setisOtp(res.data.otp);
    }
   
       
 return (
    <div className='forgot_page row_center'>
        <div className='container pt-5  pb-5'>
            <div className='row row_center align-items-start'>
                <div className='col-lg-4 col-sm-11 col-md-6'>
                    { !ispassword ? 
                    <div className='login_form_card '>
                         <div className=''>
                             <h1 className='text-center mb-3'>Socialight</h1>
                            <div className='forgot_icon row_center'>
                                <span>
                                    <LockIcon></LockIcon>
                                </span>
                            </div>
                            <div className='login_form'>
                                <div className='text-center mt-3 mb-3 text-secondary'> 
                                    <span> Enter your email or username and we'll send you a "OTP" to get back into your account.</span>
                                </div>
                                <from className="">

                                    <div className='mb-2'>
                                        <input className='form-control' name='username' onChange={handelChange} placeholder=' Username or Email'/>
                                    </div>
                                    {error ? <p className='mb-2 text-center'>{error}</p> : null} 
                                    <div className='mb-2'>
                                        <button onClick={handeldata}   className='btn btn-primary'>Send OTP </button>
                                    </div>
                                </from>
                    
                                <div className='row_evenly mt-4'>
                                    <div className='stright_line'></div>
                                    <div className='stright_line_text' > OR </div>
                                    <div className='stright_line'></div>
                                </div>
                                <div>
                                    <Link to={"/register"}> <p className='text-center pt-3 m-0 fw-bolder create_acount'>Create New account</p></Link>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-3 p-0 change_bg'>
                            <Link to={"/"}><p className='m-0 fw-bolder create_acount'>Back To Login</p></Link>
                        </div>
                    </div> :
                        <Otp otp={isOtp} user={userdata}/>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgot

