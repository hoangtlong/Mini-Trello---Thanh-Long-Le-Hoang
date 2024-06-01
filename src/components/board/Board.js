import React from 'react';
import List from '../list/List';
import Sidebar from '../sidebar/Sidebar';
import TaskBoard from '../task/TaskBoard';
import './Board.css';

function Board() {
	return (
		<div className="app">
		  <div className="main-content">
			<Sidebar />
			<TaskBoard />
		  </div>
		</div>
	  );
}

export default Board;
