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
import CreateTask from '../components/task/CreateTask';
import CardBoard from '../components/card/CardBoard';
import CreateCard from '../components/card/CreateCard';

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
						<Route path="/board-card/:id" element={<Board/>}/>
						<Route path="/signup" element={<SignUp/>}/>
						<Route path="/create-board" element={<CreateBoard/>} />
						<Route path="/boarddetail/:id" element={<BoardDetail/>} />
						<Route path="/taskcreate" element={<CreateTask/>} />
						<Route path="/board/:boardId" element={<CardBoard />} />
						<Route path="/boards/:boardId/cards" element={<CreateCard />} />
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