const express = require('express');
const { signup, signin, verify } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify', verify);

module.exports = router;
