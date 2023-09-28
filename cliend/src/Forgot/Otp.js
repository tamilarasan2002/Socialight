import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import SendIcon from '@mui/icons-material/Send';
import { ForgotContaxt } from '../Contaxt/forgotContaxt';
const Otp = (e) => {
    const [onotp, setOtp] = useState();
    const [newOTP,setOTP] = useState(e.otp);
    const [error,setError] = useState(null);
    const [verifiedtext,setverifiedtext] = useState();
    const [successMsg, setSuccess ] = useState(false);
    const { ChangePassword } = useContext(ForgotContaxt);
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setverifiedtext("Resend OTP")
        } else {
          if (seconds === 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds(prevSeconds => prevSeconds - 1);
          }
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [minutes, seconds]);
   
    
    const handeldOtp = async() =>{
        if(parseInt(newOTP) === parseInt(onotp)){
            console.log(typeof(onotp),typeof(newOTP));
            setError('Verfied Successfully');
            setSuccess(true);

            const res = await ChangePassword(e.user);
            return
        }
        setError('OTP is incorrect. Please verify that one.')
        
    }
    const { sendOTP } = useContext(ForgotContaxt);

    const reSend = async () =>{
        const res = await sendOTP(e.user);
        setOTP(res.data.otp)
        alert(res.data.otp);
    }
        

        
       
  


  return (
    <div className='Otp_container'>
        <div className='text-center'>
            <h2 className='text-primary m-1'>Verification Code</h2>
            <p className='text-secondary '>Please look for the code verification code in your registered email.  </p>
        </div>
        <div className='input_box mb-3'>
            <OtpInput                           
                value={onotp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input  className = "otp_box" {...props} />}
            />
        </div>
        {
            !successMsg ?   
            !verifiedtext?
            <p className='text-center'>Verification will soon overtake {minutes}:{seconds} </p>:
            <div className='text-end text-success mb-2'> <a onClick={reSend}>{verifiedtext} <SendIcon /></a></div>:
            null
        }
        {error ? <p className='mb-2 text-center'>{error}</p> : null} 
        <div className=''>
            <button onClick={handeldOtp}   className='btn btn-primary'>Submit </button>
        </div>
        {/*<div className='login_signup'>
            <div className='login'>
                 <button  className='btn btn-primary'> Login</button>
            </div>
  </div> */}
    </div>
  )
}

export default Otp
