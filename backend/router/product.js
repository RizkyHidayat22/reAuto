const productController = require("../controllers/productController");
const { authorizationAsAdmin } = require("../middleware/authorication");

const upload = require("../utils/multer");
const uploadImage = upload.single("imageUrl");

const router = require("express").Router();

router.post("/", authorizationAsAdmin, uploadImage, productController.handleAdd);
router.post("/midtrans", productController.midtrans);
router.get("/readproduct", productController.readProduct);
router.get("/:id", productController.readId);
router.patch("/:id", authorizationAsAdmin, uploadImage, productController.patchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
