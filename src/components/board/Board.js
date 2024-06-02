import React from 'react';
import List from '../list/List';
import Sidebar from '../sidebar/Sidebar';
import CardBoard from '../card/CardBoard';
import './Board.css';
import { useParams } from 'react-router-dom';


function Board() {
	const { id } = useParams();

	return (
		<div className="app">
		  <div className="main-content">
			<Sidebar />
			<CardBoard id={id}/>
		  </div>
		</div>
	  );
}

export default Board;
