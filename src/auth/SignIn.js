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
        navigate('/board');
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
        <img src="logo.svg" alt="Logo" className="logo" />
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
        <img src="illustration-left.png" alt="Illustration" className="illustration-left" />
        <img src="illustration-right.png" alt="Illustration" className="illustration-right" />
      </div>
    </div>
  );
}

export default SignIn;
