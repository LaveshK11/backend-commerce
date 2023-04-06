// all available routes are in this file

const express = require("express");
const router = express.Router();

// available middleware
const register = require("../controller/userLoginRegister");
const registerModel = require("../models/user");

const app = express();
app.use(router);

router.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Api is working!" });
});

// user login register route
router.post("/api/register", register.registerUser);
router.post("/api/login", register.loginUser);
router.post("/api/verifyOtp"  , register.verifyOtp)
//------------------------------END--------------------------


module.exports = router;
