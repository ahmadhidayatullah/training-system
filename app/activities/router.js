var express = require('express');
var router = express.Router();
const { index, register, update, deleteData } = require('./controller')
const { authenticate, permission } = require('../middleware/auth')
const { validate } = require('./validation');

router.use(authenticate);

router.get('/:skill_id', index);
router.post('/', validate('register'), permission('expert'), register);
router.put('/:ID', validate('update'), permission('expert'), update);
router.delete('/:ID', permission('expert'), deleteData);

module.exports = router;
