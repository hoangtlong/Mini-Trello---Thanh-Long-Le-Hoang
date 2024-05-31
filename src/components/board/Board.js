import React from 'react';
import List from '../list/List';
import './Board.css';

function Board() {
    return (
        <div className="board">
            <div className="sidebar">
                <h2>Your boards</h2>
                <ul>
                    <li>My Trello board</li>
                </ul>
                <h2>Members</h2>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                    <li>User 4</li>
                </ul>
                <button className="close-btn">Close</button>
            </div>
            <div className="board-content">
                <h2>My Trello board</h2>
                <div className="lists">
                    <List title="To do" cards={["Project planning", "Kickoff meeting"]} />
                    <List title="Doing" cards={[]} />
                    <List title="Done" cards={["Kickoff meeting"]} />
                    <div className="add-list">
                        + Add another list
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;
