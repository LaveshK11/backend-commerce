const User = require("../../models/user");
const jwt = require("jsonwebtoken");

/**
 * @desc    Getting user details form token
 * @route   POST /api/userDetails
 * @access  Private
 * @param   {JWT token}
 * */
exports.getUserDetails = async (req, res) => {
  const token = req.cookies.JWT;
  const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verifyUser);
  User.find(
    { email: verifyUser.user },
    { password: 0, verified: 0, _id: 0 },
    function (err, data) {
      if (err) console.log(err);
      else {
        res.status(200).send({
          success: true,
          data: data
        });
      }
    }
  );
};
