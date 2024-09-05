const express = require("express");
const router = express.Router();
const category = require("./category");
const product = require("./product");
const userController = require("../controllers/userController");
const handleError = require("../middleware/handleerror");
const authentication = require("../middleware/authentication");
const { authorizationAsAdmin } = require("../middleware/authorication");

router.post("/register", userController.Register);
router.post("/login", userController.login);
router.post('/googleAuth', userController.LoginWithGoogel)

router.use(authentication);
router.use("/products", product);
router.use("/categories", authorizationAsAdmin, category);

router.use(handleError);

module.exports = router