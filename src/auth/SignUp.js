import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
          </>
        )}
        <p className="privacy-policy">Privacy Policy</p>
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
      <div className="illustrations">
        {/*<img src="illustration-left.png" alt="Illustration" className="illustration-left" />*/}
        {/*<img src="illustration-right.png" alt="Illustration" className="illustration-right" />*/}
      </div>
    </div>
  );
};

export default SignUp;
