const express = require('express');
const { createTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new task within a card
router.post('/boards/:boardId/cards/:cardId/tasks', authMiddleware.authenticateRequest,createTask);

module.exports = router;
