// src/components/TaskBoard.jsx
import React from 'react';
import './TaskBoard.css';

function TaskBoard() {
  return (
    <div className="task-board">
      <div className="task-header">
        <h1>My Trello board</h1>
        <button className="invite-btn">Invite member</button>
      </div>
      <div className="task-content">
        <div className="task-list">
          <h2>To do</h2>
          <div className="task-card">Project planning</div>
          <div className="task-card">Kickoff meeting</div>
          <div className="add-card">+ Add a card</div>
        </div>
        <div className="task-list">
          <h2>Doing</h2>
          <div className="add-card">+ Add a card</div>
        </div>
        <div className="task-list">
          <h2>Done</h2>
          <div className="task-card">Kickoff meeting</div>
          <div className="add-card">+ Add a card</div>
        </div>
        <div className="add-list">+ Add another list</div>
      </div>
    </div>
  );
}

export default TaskBoard;
