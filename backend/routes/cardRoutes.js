const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/boardController');
const verifyToken = require('../middlewares/auth');


router.get('/boards/:boardId/cards', verifyToken, cardController.getAllCards);
router.post('/boards/:boardId/cards', verifyToken, cardController.createCard);

module.exports = router;
