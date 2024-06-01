// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span>Your boards</span>
      </div>
      <div className="sidebar-content">
        <div className="board">
          <span>My Trello board</span>
        </div>
        <div className="members">
          <div className="member">
            <div className="avatar">SD</div>
            <span>User 1</span>
          </div>
          <div className="member">
            <div className="avatar">SD</div>
            <span>User 2</span>
          </div>
          <div className="member">
            <div className="avatar">SD</div>
            <span>User 3</span>
          </div>
          <div className="member">
            <div className="avatar">SD</div>
            <span>User 4</span>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <button className="close-btn">Close</button>
        <p>You can’t find and reopen closed boards if you close the board</p>
      </div>
    </aside>
  );
}

export default Sidebar;
