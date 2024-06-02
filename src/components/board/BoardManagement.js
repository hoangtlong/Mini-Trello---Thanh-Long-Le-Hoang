import React from 'react';
import './BoardManagement.css';
import { useNavigate } from 'react-router-dom';
import AllBoards from './AllBoards';

function BoardManagement() {

  const navigate = useNavigate();

	
  return (
	<div className='board-bg'>
		  <div className="board-management">
			  <div className="sidebar-m">
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
			  <div className="main-content-m">
				  <div className='board-m-title'>
					  <span className="workspace-title">YOUR WORKSPACES</span>
				  </div>
				  <div className="workspace">
					  {/*<div className="board">
            My Trello board
			Boardlist
          </div>*/}

					  {/*<div onClick={()=>{handleNav()}} className="create-board-m">
            + Create a new board
          </div>*/}
				  </div>

				  <AllBoards />

			  </div>
		  </div>
	</div>
  );
}

export default BoardManagement;
