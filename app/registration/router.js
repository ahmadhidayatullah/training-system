var express = require('express');
var router = express.Router();
const { createUser } = require('./controller')
const { authenticate, permission } = require('../middleware/auth')

router.use(authenticate);

router.post('/', permission('board'), createUser);

module.exports = router;
