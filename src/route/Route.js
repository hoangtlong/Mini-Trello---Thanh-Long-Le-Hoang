import React, { useState } from 'react';
//import { useNavigate, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from '../auth/SignIn';
import EmailVerification from '../auth/EmailVerification';
import BoardManagement from '../components/board/BoardManagement';
import Board from '../components/board/Board';
import SignUp from '../auth/SignUp';
import CreateBoard from '../components/board/CreateBoard';
import BoardDetail from '../components/board/BoardDetail';
import Header from '../components/header/Header';

const RoutePage = () => {
	return (
		<Router>
		  <div className="app-container">
			<Routes>
			  <Route
				path="/"
				element={<SignIn />}
			  />
			  <Route
				path="/signup"
				element={<SignUp />}
			  />
			  <Route
				path="/*"
				element={
				  <>
					<Header />
					<Routes>
						<Route path="/emailverified" element={<EmailVerification/>}/>
						<Route path="/boards" element={<BoardManagement/>}/>
						<Route path="/boardlist" element={<Board/>}/>
						<Route path="/signup" element={<SignUp/>}/>
						<Route path="/create-board" element={<CreateBoard/>} />
						<Route path="/boarddetail/:id" element={<BoardDetail/>} />
					</Routes>
				  </>
				}
			  />
			</Routes>
		  </div>
		</Router>
	  );
}

export default RoutePage;