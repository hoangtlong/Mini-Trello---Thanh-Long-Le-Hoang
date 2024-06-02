const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/boards/:boardId/cards', authMiddleware.authenticateRequest, cardController.getAllCards);
router.post('/boards/:boardId/cards', authMiddleware.authenticateRequest, cardController.createCard);

module.exports = router;
