//import React, { useState } from 'react';

//function CreateTask({ boardId, onClose }) {
//    const [title, setTitle] = useState('');
//    const [description, setDescription] = useState('');
//    const [status, setStatus] = useState('');
//    const [error, setError] = useState('');

//    const handleSubmit = async (e) => {
//        e.preventDefault();

//        const token = localStorage.getItem('token');

//        try {
//            const response = await fetch(`/api/boards/${boardId}/cards/${cardId}/tasks`, {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`,
//                },
//                body: JSON.stringify({ title, description, status }),
//            });

//            if (response.ok) {
//                const data = await response.json();
//                console.log('Task created successfully:', data);
//                onClose();  // Close the form after successful task creation
//            } else {
//                const errorData = await response.json();
//                setError(errorData.error);
//            }
//        } catch (error) {
//            console.error('Error:', error);
//            setError('Error creating task');
//        }
//    };

//    return (
//        <div className="modal">
//            <div className="modal-content">
//                <span className="close" onClick={onClose}>&times;</span>
//                <h2>Create a New Task</h2>
//                <form onSubmit={handleSubmit}>
//                    <div>
//                        <label htmlFor="title">Task Title:</label>
//                        <input
//                            type="text"
//                            id="title"
//                            value={title}
//                            onChange={(e) => setTitle(e.target.value)}
//                        />
//                    </div>
//                    <div>
//                        <label htmlFor="description">Task Description:</label>
//                        <textarea
//                            id="description"
//                            value={description}
//                            onChange={(e) => setDescription(e.target.value)}
//                        />
//                    </div>
//                    <div>
//                        <label htmlFor="status">Task Status:</label>
//                        <input
//                            type="text"
//                            id="status"
//                            value={status}
//                            onChange={(e) => setStatus(e.target.value)}
//                        />
//                    </div>
//                    <button type="submit">Create Task</button>
//                </form>
//                {error && <p style={{ color: 'red' }}>{error}</p>}
//            </div>
//        </div>
//    );
//}

//export default CreateTask;
