import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './SignIn.css'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

	  console.log('value verified', verificationCode);

      const data = await response.json();
	  console.log('data response',data);
      if (response.ok) {
        console.log('Email verified successfully');
		navigate('/board');
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src="logo.svg" alt="Logo" className="logo" />
        <h2>Sign up to get started</h2>
        {step === 1 && (
          <>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleSignUp}>Sign Up</button>
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
            <button onClick={handleVerify}>Verify</button>
			<br/>
			<br/>
          </>
        )}
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
};

export default SignUp;
