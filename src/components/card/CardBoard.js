import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CardBoard.css';
import CardList from './CardList';

function CardBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setcards] = useState([]);
  const [socket, setSocket] = useState(null);

  console.log('card board id	 ', id);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(`/api/boards/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBoard(data);
          // Giả sử rằng API cũng trả về danh sách card
          setcards(data.cards || []);
        } else {
          console.error('Failed to fetch board details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBoardDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value
    }));
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    saveBoardName();
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveBoardName();
      setIsEditing(false);
    }
  };

  const saveBoardName = async () => {
    const cleanObject = (obj) => {
      return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
    };

    const updatedBoard = cleanObject({ name: board.name, description: board.description });

    if (socket) {
      console.log(`Sending update via WebSocket: ${JSON.stringify({ type: 'UPDATE_BOARD_NAME', id, ...updatedBoard })}`);
      socket.send(JSON.stringify({ type: 'UPDATE_BOARD_NAME', id, ...updatedBoard }));
    } else {
      try {
        const response = await fetch(`/api/boards/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updatedBoard)
        });

        if (!response.ok) {
          console.error('Failed to update board name');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handlecardCreate = () => {
	navigate('//boards/:boardId/card');
  }

  return (
    <div className="card-board">
      <div className="card-header">
        <h1>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={board.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Board Name"
            />
          ) : (
            <span onClick={handleNameClick}>{board.name || 'Board Name'}</span>
          )}
        </h1>
        <button className="invite-btn">Invite member</button>
      </div>
	  <div className='card-content'>
        <CardList boardId={id}/>
	  </div>
    </div>
  );
}

export default CardBoard;
