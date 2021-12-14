const { Router } = require("express");
const { check } = require("express-validator");
const { tasksGet, tasksPost, tasksPut, tasksDelete } = require("../controllers/tasks");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require('../helpers/validate-fields');


const router = Router();

router.get('/', [validateJWT], tasksGet);

router.post('/', [
    validateJWT,
    check('description', 'The Description is required').not().isEmpty(),
    validateFields
], tasksPost);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('description', 'The Description is required').not().isEmpty(),
    // check('id').custom( existeProducto ),
    validateFields
], tasksPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    // check('id').custom( existeProducto ),
    validateFields
], tasksDelete);

module.exports = router;