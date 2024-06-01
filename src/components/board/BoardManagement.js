import React from 'react';
import './BoardManagement.css';
import { useNavigate } from 'react-router-dom';
import AllBoards from './AllBoards';

function BoardManagement() {

  const navigate = useNavigate();
  const handleNav = () => {
	navigate('/create-board');
  }
	
  return (
    <div className="board-management">
      <div className="sidebar">
        <div className="menu">
          <div className="menu-item active">
            <i className="icon-bar-chart"></i>
            Boards
          </div>
          <div className="menu-item">
            <i className="icon-users"></i>
            All Members
          </div>
        </div>
      </div>
      <div className="main-content">
        <div>
          <span className="workspace-title">YOUR WORKSPACES</span>
        </div>
        <div className="workspace">
          {/*<div className="board">
            My Trello board
			Boardlist
          </div>*/}

		  <div onClick={()=>{handleNav()}} className="create-board">
            + Create a new board
          </div>
        </div>

		<AllBoards/>

      </div>
    </div>
  );
}

export default BoardManagement;
