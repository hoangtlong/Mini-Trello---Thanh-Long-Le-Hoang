// controllers/taskController.js
const admin = require('firebase-admin');

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const { boardId } = req.params;
    const userEmail = req.user.email; // Assuming user is authenticated and user email is available in req.user

    try {
        // Create a new card
        const newCard = {
            boardId,
            userEmail,
            createdAt: new Date().toISOString(),
        };

        const cardRef = await admin.firestore().collection('cards').add(newCard);
        const cardId = cardRef.id;

        // Create a new task within the new card
        const newTask = {
            title,
            description,
            status,
            cardId,
            ownerId: userEmail,
            createdAt: new Date().toISOString(),
        };

        const taskRef = await admin.firestore().collection('tasks').add(newTask);

        // Notify clients about the new task
        const taskData = {
            id: taskRef.id,
            ...newTask,
        };
        notifyClientsAboutNewTask(taskData);

        res.status(201).json(taskData);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task' });
    }
};

const notifyClientsAboutNewTask = (task) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'NEW_TASK', task }));
        }
    });
};

module.exports = {
    createTask,
};
