import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateTask from '../task/CreateTask'; // Import the CreateTask component
//import CreateCard from './CreateCard';

function TaskList() {
    const { boardId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false); // State to control the visibility of CreateTask form

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/boards/${boardId}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();

        const ws = new WebSocket('ws://localhost:5000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'NEW_TASK') {
                setTasks((prevTasks) => [...prevTasks, message.task]);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [boardId]);

    return (
        <div>
            <h3>Task List</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
            <div className="add-list" onClick={() => setShowCreateTask(true)}>
                + Add another list
            </div>
            {showCreateTask && (
                <CreateCard 
                    boardId={boardId} 
                    onClose={() => setShowCreateTask(false)} 
                />
            )}
        </div>
    );
}

export default TaskList;
