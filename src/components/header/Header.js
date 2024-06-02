import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {

	const navigate = useNavigate();

	const handleHome = () => {
		navigate('/boards');
	}

  return (
    <header className="header">
      <div className="header-left">
	  <img src="https://s3-alpha-sig.figma.com/img/5c1e/9712/b859b236bae588dba1854e1f96583537?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eMrrGcIjg8OmwzWaEBYjV3lDILhyJKfOUQ7u-5~~mxsn4V50oNa2wBe~FwH8Fe2~GhRTRZ30RDZabPJUWTD8j2YAsf9Q3ESGFtt8jCwjqKXF291sVktFB2L7ESv9Gmq8RBxtwukafLLWI8HtP39mRs2NjuqIttcwZyvN~WTLesEmOSHJZEf2G23pnWJN0f1Y3RQYU161Zu8hmR0tCPA5n4~hkys9KUcnY8vSUZtjT~Ou1oUPL8kVzaBw96OnVquCD2fgzJWuob7nOQo481Jw0ErgYmRZFbFo8PVR0vYdAfFpnYGShRC1VrvZ52cFhf0VSbsCPMxqpxNxPO--3SRYWw__" 
	  	alt="Logo" 
	  	className="logo-header" 
		onClick={()=>{handleHome()}}
	  />
      </div>
      <div className="header-right">
        <i className="icon-bell"></i>
        <div className="user-profile">
          <img src="avatar.png" alt="User Avatar" className="avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
