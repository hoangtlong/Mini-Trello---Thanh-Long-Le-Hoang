import React, { useState, useEffect } from 'react';
import './AllBoards.css'; 
import { useNavigate } from 'react-router-dom';

function AllBoards() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
	
	const fetchBoards = async () => {
	  try {
		const token = localStorage.getItem('token'); 
		const response = await fetch('/api/boards', {
		  method: 'GET',
		  headers: {
			'Authorization': `Bearer ${token}`,
		  },
		//  body: JSON.stringify({ name, description }),
		});
  
		if (response.ok) {
		  const data = await response.json();
		  setBoards(data);
		} else {
		  const errorData = await response.json();
		  setError(errorData.error);
		}
	  } catch (error) {
		console.error('Error:', error);
		setError('Error retrieving boards');
	  }
	};
  
	fetchBoards();
  }, []); // Dependency array trống chỉ chạy một lần sau khi component mount
  
  useEffect(() => {
	const ws = new WebSocket('ws://localhost:5000');
  
	ws.onmessage = (event) => {
	  const message = JSON.parse(event.data);
	  if (message.type === 'DELETE_BOARD') {
		setBoards(prevBoards => prevBoards.filter(board => board.id !== message.id)); // Sử dụng functional update
	  }
	};
  
	ws.onclose = () => {
	  console.log('WebSocket disconnected');
	};
  
	return () => {
	  ws.close();
	};
  }, []); // Dependency array trống chỉ chạy một lần sau khi component mount
  
  

  const handleDeleteBoard = async () => {
	const token = localStorage.getItem('token');
	try {
	  const response = await fetch(`/api/boards/${boardToDelete}`, {
		method: 'DELETE',
		headers: {
		  'Authorization': `Bearer ${token}`,
		},
	  });
  
	  if (response.status === 204) {
		// Xóa board khỏi danh sách boards sau khi xóa thành công
		setBoards(prevBoards => prevBoards.filter(board => board.id !== boardToDelete));
		setShowConfirmation(false);
		setBoardToDelete(null);
	  } else {
		console.error('Failed to delete board');
	  }
	} catch (error) {
	  console.error('Error:', error);
	}
  };
  

  const handleBoardClick = (id) => {
    //navigate(`/boarddetail/${id}`);
    navigate(`/board-card/${id}`);
  };

  const handleNav = () => {
    navigate('/create-board');
  };

  return (
    <div className="all-boards-container"> 
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="boards-grid"> 
        <div onClick={handleNav} className="create-board-m">
          + Create a new board
        </div>
        {boards.map(board => (
          <div key={board.id} className="board-card" >
            <div onClick={() => handleBoardClick(board.id)}>
              <h3>{board.name}</h3>
              <p>{board.description}</p>
            </div>
            <button onClick={() => { setShowConfirmation(true); setBoardToDelete(board.id); }}>Delete</button>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this board?</p>
          <button onClick={handleDeleteBoard}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default AllBoards;
