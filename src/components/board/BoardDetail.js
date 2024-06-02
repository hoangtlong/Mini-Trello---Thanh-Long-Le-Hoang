import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function BoardDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [board, setBoard] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(`/api/boards/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Sử dụng token từ localStorage
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBoard(data);
          // Giả sử rằng API cũng trả về danh sách task
          setTasks(data.tasks || []);
        } else {
          console.error('Failed to fetch board details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBoardDetails();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value
    }));
  };

  const handleUpdateBoard = async () => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: board.name,
          description: board.description
        })
      });

		console.log('id', id);


      if (response.ok) {
        const updatedBoard = await response.json();
        setBoard(updatedBoard);
        setIsEditing(false);
        console.log('Board updated successfully');
      } else {
        console.error('Failed to update board');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Board Details</h1>
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={board.name}
            onChange={handleInputChange}
            placeholder="Board Name"
          />
          <textarea
            name="description"
            value={board.description}
            onChange={handleInputChange}
            placeholder="Board Description"
          ></textarea>
          <button onClick={handleUpdateBoard}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <h2>Tasks</h2>
      <ul>
        {board.tasks && board.tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/boards')}>Back to Boards</button>
    </div>
  );
}

export default BoardDetail;
