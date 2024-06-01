import React, { useState, useEffect } from 'react';
import './AllBoards.css'; // Import file CSS cho component này
import {useNavigate} from 'react-router-dom';

function AllBoards() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        const response = await fetch('/api/boards/getall', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
  }, []);

  const handleBoardClick = (id) => {
    navigate(`/boarddetail/${id}`);
  };

  return (
    <div className="all-boards-container"> {/* Container bao bọc */}
      {/*<h2>All Boards</h2>*/}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="boards-grid"> {/* Sử dụng CSS Grid cho danh sách các bảng */}
        {boards.map(board => (
          <div key={board.id} className="board-card"   onClick={() => handleBoardClick(board.id)}>
            {board.name} <br/> {board.description}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBoards;
