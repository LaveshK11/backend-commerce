// all available routes are in this file

const express = require("express");
const router = express.Router();

// available middleware
const userActivity = require("../controller/userActivity/userLoginRegister");
const userInfo = require("../controller/userActivity/getUserDetails");
const cart = require("../controller/cart/shoppingCart");
const auth = require("../controller/middleware/authMiddleware");
const porductOperation = require("../controller/operationOnProducts/searchPorducts");
const {
  addProucts,
} = require("../controller/operationOnProducts/addingProduct");

const app = express();
app.use(router);

router.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Api is working!" });
});

//get user details
router.post("/api/userDetails", auth, userInfo.getUserDetails);
//------------------------------END--------------------------

// user login register route
router.post("/api/register", userActivity.registerUser);
router.post("/api/login", userActivity.loginUser);
router.post("/api/verifyOtp", userActivity.verifyOtp);
router.post("/api/forgotPassword", userActivity.SendforgotPasswordMail);
router.get("/api/reset-password/:token", userActivity.resetPassword);
//------------------------------END--------------------------

// api related to adding the porduct
router.post("/api/addProduct", addProucts);

// api's realted to cart and product details of users
router.post("/api/move-to-cart", auth, cart.moveToCart);
router.get("/api/products/search", porductOperation.searchProduct);
router.get("/api/products/category/serach", porductOperation.searchCategory);
router.get("/api/products/category", porductOperation.getallcategory);
module.exports = router;
