import React from 'react';
import './SignIn.css'; 
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const routeChange = () => { 
    const path = '/signup'; 
    navigate(path);
  }

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  const handleSignIn = async () => {
    try {
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep(2); // Chuyển sang bước 2 để nhập mã xác thực
      } else {
        const data = await response.json();
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Email verified successfully');
        // Lưu token và chuyển hướng nếu cần thiết
        localStorage.setItem('token', data.accessToken);
        navigate('/boards');
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="https://s3-alpha-sig.figma.com/img/5c1e/9712/b859b236bae588dba1854e1f96583537?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eMrrGcIjg8OmwzWaEBYjV3lDILhyJKfOUQ7u-5~~mxsn4V50oNa2wBe~FwH8Fe2~GhRTRZ30RDZabPJUWTD8j2YAsf9Q3ESGFtt8jCwjqKXF291sVktFB2L7ESv9Gmq8RBxtwukafLLWI8HtP39mRs2NjuqIttcwZyvN~WTLesEmOSHJZEf2G23pnWJN0f1Y3RQYU161Zu8hmR0tCPA5n4~hkys9KUcnY8vSUZtjT~Ou1oUPL8kVzaBw96OnVquCD2fgzJWuob7nOQo481Jw0ErgYmRZFbFo8PVR0vYdAfFpnYGShRC1VrvZ52cFhf0VSbsCPMxqpxNxPO--3SRYWw__" alt="Logo" className="logo" />
        <h2>Log in to continue</h2>
        {step === 1 && (
          <>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleSignIn}>Continue</button>
            <br/><br/>
          </>
        )}
        {step === 2 && (
          <>
            <input 
              type="text" 
              placeholder="Enter verification code" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
            />
            <button onClick={handleVerify}>Submit</button>
			<br/>
			<br/>
          </>
        )}
        <button onClick={handleLogin}>Continue with GitHub</button>
        <br/><br/>
        <p onClick={routeChange}>or Create an account</p>
        <p className="privacy-policy">Privacy Policy</p>
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
      <div className="illustrations">
        <img src="https://s3-alpha-sig.figma.com/img/0f8d/d818/03d8197c0ec866717fac5bb58890ecc8?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WK3m3BeHdF5OFoKHAAfghNjY7RajBCpvywNUyHnel3v8MfZIJH4TSv99g1WnZ5DXygQ0gaK9Y6smEKnjMctn46qiPU19whuFfnzgHSXpYu3ZCKfx7HfzFH9IR~FxPKKR16AFmm1TZOsbyBxx1w~8ixSLH914lnHBhw6eIyrkXAXAxYqNCsuDmOSS5W-GIdjqYyghXou1e2uxThcSvUIWUVw3TS1DGjuTQ03Kte0JRUY73Fglonhc9IS2isA8oZodxn90XPEisbE0~WaIsCbvnrg7qIwmgsCzJ01o9lExWtXfo2HaRt8xesorcOoM7zipZ2GUqrKqkUs86dNlffQbsA__" alt="Illustration" className="illustration-left" />
        <img src="https://s3-alpha-sig.figma.com/img/0cdc/0b6e/5b9556f2dbe70c11da56fd7df45a059d?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZRxWZh-rX0UF8Bm0Btfn1s8X10LncdQruexlWNI0KvALs~lkgpk0qlOZ5uy6noG1RcnO5uQ412MeawVFJ5~SIJPe7jdJy4wAzhrz1YrdxGAg~vCkDtBXwY5ArFqesqmcrstzVFxPwU97LOEBLoAXi9QvcjIZeh9nwOFBDfJLe2T77AP0ydxcnS9xUuoF8m51traCqGG59ZylDv5gADZG8~ISLM4vT41-J6pns6kVCF48NOX6lsiDY90RB1ulmeQyXlqOzbMYxJARLCwbcbRyNXgOqKNC2k-c9yOidj5eWBPK0~1~XhXgLpdM~pareDteXdTj6uhPNL7mt9HZLQr1hA__" alt="Illustration" className="illustration-right" />
      </div>
    </div>
  );
}

export default SignIn;
