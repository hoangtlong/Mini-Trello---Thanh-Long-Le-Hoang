import React from 'react';
import './EmailVerification.css';
import {useState} from 'react';

function EmailVerification() {

	const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = async () => {
        try {
            // Gửi mã xác thực đến backend để xác thực email
            const response = await fetch('/auth/emailverification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ verificationCode })
            });

            // Xử lý phản hồi từ backend
            if (response.ok) {
                // Chuyển hướng đến trang chính sau khi xác thực thành công
                window.location.href = '/';
            } else {
                // Xử lý lỗi
                const errorData = await response.json();
                console.error('Error:', errorData.error);
                // Hiển thị thông báo lỗi cho người dùng
            }
        } catch (error) {
            console.error('Error:', error);
            // Hiển thị thông báo lỗi cho người dùng
        }
    };

    return (
        <div className="container">
            <div className="email-verification">
                <h1>Email Verification</h1>
                <p>Please enter your code that was sent to your email address</p>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
                <p className="privacy-policy">
                    Privacy Policy
                    <br />
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
            </div>
            <div className="left-illustration"></div>
            <div className="right-illustration"></div>
        </div>
    );
}

export default EmailVerification;
