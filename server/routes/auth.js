const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../helpers/validate-fields');

const router = Router();

router.post('/login', [
   check('email', 'The Email is required').isEmail(),
   check('password', 'The Password is required').not().isEmpty(),
   validateFields
], login);

module.exports = router;