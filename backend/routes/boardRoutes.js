const express = require('express');
const { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/boardController');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.post('/create', verifyToken, createBoard);
router.get('/getall', verifyToken, getAllBoards);
router.get('/detail/:id', verifyToken, getBoardById);
router.put('/update/:id', verifyToken, updateBoard);
router.delete('/delete/:id', verifyToken, deleteBoard);

module.exports = router;
