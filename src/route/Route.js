import React, { useState } from 'react';
//import { useNavigate, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from '../auth/SignIn';
import EmailVerification from '../auth/EmailVerification';
import BoardManagement from '../components/board/BoardManagement';
import Board from '../components/board/Board';
import SignUp from '../auth/SignUp';

const RoutePage = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SignIn/>}/>
				<Route path="/emailverified" element={<EmailVerification/>}/>
				<Route path="/board" element={<BoardManagement/>}/>
				<Route path="/boardlist" element={<Board/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				
			</Routes>
		</Router>
	)
}

export default RoutePage;