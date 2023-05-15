const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyUser);
    let user = await User.findOne({ email: verifyUser.user });
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid",
    });
  }
};
module.exports = auth;
