const categoryController = require('../controllers/categoryController');

const router = require('express').Router();


router.post ('/', categoryController.handleAdd)
router.get ('/', categoryController.readCategory)
router.put ('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)


module.exports = router