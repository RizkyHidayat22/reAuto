const productController = require('../controllers/productController');
const { authorizationAsAdmin } = require('../middleware/authorication');

const upload = require('../utils/multer');
const uploadImage = upload.single('imageUrl')



const router = require('express').Router();


router.post ('/', authorizationAsAdmin, uploadImage, productController.handleAdd)
router.get('/', productController.readData)
router.get('/readproduct', productController.readProduct)
router.get('/:id', productController.readId)
router.patch('/:id', authorizationAsAdmin, uploadImage, productController.patchProduct)
router.put ('/:id', authorizationAsAdmin, productController.updateProduct)
router.delete('/:id', authorizationAsAdmin, productController.deleteProduct)


module.exports = router 