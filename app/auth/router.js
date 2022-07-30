const express = require('express');
const router = express.Router();
const { login, logout } = require('./controller')
const { authenticate } = require('../middleware/auth')

router.post('/login', login);
router.get('/logout', authenticate, logout);

module.exports = router;
