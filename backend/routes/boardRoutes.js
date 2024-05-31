const express = require('express');
const { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/boardController');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.post('/boards', verifyToken, createBoard);
router.get('/boards', verifyToken, getAllBoards);
router.get('/boards/:id', verifyToken, getBoardById);
router.put('/boards/:id', verifyToken, updateBoard);
router.delete('/boards/:id', verifyToken, deleteBoard);

module.exports = router;
