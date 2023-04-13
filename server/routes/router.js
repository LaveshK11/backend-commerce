// all available routes are in this file

const express = require("express");
const router = express.Router();

// available middleware
const register = require("../controller/userActivity/userLoginRegister");
const userInfo = require('../controller/userActivity/getUserDetails')
const cart = require("../controller/cart/shoppingCart")
const registerModel = require("../models/user");

const app = express();
app.use(router);

router.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Api is working!" });
});


//get user details
router.post("/api/userDetails" , userInfo.getUserDetails)
 //------------------------------END--------------------------


// user login register route
router.post("/api/register", register.registerUser);
router.post("/api/login", register.loginUser);
router.post("/api/verifyOtp"  , register.verifyOtp)
//------------------------------END--------------------------

// api's realted to shopping cart
router.post("/api/move-to-cart", cart.moveToCart);


module.exports = router;
