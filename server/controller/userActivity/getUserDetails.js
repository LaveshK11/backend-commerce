const User = require("../../models/user");

/**
 * @desc Getting user details using jwt tokens 
 * @route  POST /api/userDetails
 * @param {*} req 
 * @access Private
 */
exports.getUserDetails = async (req, res) => {
  User.find(
    { email: "laveshkhairajani01@gmail.com" },
    { password: 0, verified: 0 },
    function (err, data) {
      if (err) console.log(err);
      else {
        console.log(data);
      }
    }
  );
};
