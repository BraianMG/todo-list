const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { emailExist } = require('../middlewares/email-exist');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'The Name is required').not().isEmpty(),
    check('password', 'The password must be more than 8 digits').isLength( { min:8 } ),
    check('email', 'The email is not valid').isEmail(),
    // check('role','Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email').custom( emailExist ),
    validateFields
], usersPost);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
], usersPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    isAdminRole
], usersDelete);

module.exports = router;