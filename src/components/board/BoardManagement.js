import React from 'react';
import './BoardManagement.css';

function BoardManagement() {
	
  return (
    <div className="board-management">
      <div className="sidebar">
        <div className="logo">S</div>
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
        <div className="header">
          <span className="workspace-title">YOUR WORKSPACES</span>
          <div className="user-profile">
            <i className="icon-bell"></i>
            <div className="user-initials">SD</div>
          </div>
        </div>
        <div className="workspace">
          <div className="board">
            My Trello board
          </div>
          <div className="create-board">
            + Create a new board
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardManagement;
