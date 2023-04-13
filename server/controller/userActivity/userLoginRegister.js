const sentEmail = require("../../helpers/emailSender");
const validator = require("../../helpers/validation");
const User = require("../../models/user");
const Otp = require("../../models/otp");

exports.registerUser = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  try {
    if (result == 0) {
      User.find({ email: req.body.email }, async function (err, result) {
        if (result.length) {
          res.status(200).send({
            success: true,
            exsist: 1,
            message: "User Already exsist",
          });
        } else {
          sentEmail(req.body);
          res.status(200).send({
            success: true,
            data: result,
            message: "otp has been sent on you email",
          });
        }
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Please fill data",
      });
    }
  } catch (error) {
    console.log("error here", error);
  }
};

exports.loginUser = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  try {
    if (result == 0) {
      User.aggregate(
        [
          {
            $match: {
              verified: true,
              email: `${req.body.email}`,
              password: `${req.body.password}`,
            },
          },
        ],
        function (err, data) {
          if (err) console.log(err);
          else {
            console.log(data.length);
            if (data.length > 0) {
              res.status(200).send({
                success: true,
                message: "User Login Successfully",
              });
            } else {
              console.log(data);
              res.status(200).send({
                success: false,
                data: data,
                message: "Invalid Login id or password",
              });
            }
          }
        }
      );
    } else {
      res.status(200).send({
        success: false,
        message: "Please fill data",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.verifyOtp = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  if (result == 0) {
    Otp.find(
      { otp: req.body.otp, email: req.body.userData.email },
      function (err, data) {
        if (err) {
          res.status(200).send({
            success: false,
            error: err.message,
            message: "Please fill data",
          });
        } else {
          if (data.length > 0) {
            let user = User(req.body.userData);
            user.save(function (err, result) {
              if (err) {
                if (err.name === "ValidationError") {
                  res.status(200).send({
                    success: false,
                    message: "imporper user data",
                  });
                } else if (err.keyValue) {
                  res.status(200).send({
                    success: true,
                    exsist: 1,
                    message: "User Already registerd",
                  });
                }
              } else {
                res.status(200).send({
                  success: true,
                  data: result,
                  message: "User Registered Successfully",
                });
              }
            });
          } else {
            res.status(200).send({
              success: false,
              message: "Invalid or expired Otp",
            });
          }
        }
      }
    );
  } else {
    res.status(200).send({
      success: false,
      message: "Please fill data",
    });
  }
};
