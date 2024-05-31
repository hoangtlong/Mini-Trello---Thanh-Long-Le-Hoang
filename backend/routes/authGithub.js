const express = require('express');
const router = express.Router();
const authControllerGit = require('../controllers/authControllerGit')

router.post('/githubSign', authControllerGit.githubSign);

module.exports = router;