var express = require('express');
var router = express.Router();
const { list } = require('./controller')
const { authenticate } = require('../middleware/auth')

router.use(authenticate);

router.get('/', list);

module.exports = router;
