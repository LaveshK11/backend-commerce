const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sentEmail = require("../../helpers/emailSender");
const validator = require("../../helpers/validation");
const User = require("../../models/user");
const Otp = require("../../models/otp");
const dotenv = require("dotenv");
dotenv.config();

/**
 * @desc   Register new user
 * @route   POST /api/register
 * @access  PUBLIC
 * @param   {email , Username , password }
 * */
exports.registerUser = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  try {
    if (result == 0) {
      User.findOne({ email: req.body.email }, async function (err, result) {
        if (result) {
          res.status(200).send({
            success: true,
            exsist: 1,
            message: "User Already exsist",
          });
        } else {
          sentEmail(req.body);
          res.status(200).send({
            success: true,
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

/**
 * @param {email , password} req
 * @desc    login user
 * @route   POST /api/login
 * @access  PUBLIC
 */
exports.loginUser = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  const { email, password } = req.body;
  try {
    if (result == 0) {
      const user = User.findOne({ email }, async function (err, data) {
        if (err) console.log(err);
        else {
          if (data) {
            const passwordMatch = await bcrypt.compare(password, data.password);
            if (passwordMatch) {
              res.status(200).send({
                success: true,
                message: "User Login Successfully",
              });
            } else {
              res.status(400).send({
                success: false,
                message: "Invalid Login id or password",
              });
            }
          } else {
            res.status(400).send({
              success: false,
              message: "User not found",
            });
          }
        }
      });
    } else {
      res.status(200).send({
        success: false,
        success : false,
        message: "Please fill data",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    verify otp and registering user
 * @route   POST /api/verifyOtp
 * @access  PUBLIC
 * @param   {email , Otp}
 */
exports.verifyOtp = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  if (result == 0) {
    Otp.findOne(
      { otp: req.body.otp, email: req.body.userData.email },
      async function (err, data) {
        if (err) {
          res.status(200).send({
            success: false,
            error: err.message,
            message: "Please fill data",
          });
        } else {
          if (data) {
            let salt = await bcrypt.genSalt(10);
            req.body.userData.password = await bcrypt.hash(
              req.body.userData.password,
              salt
            );
            let user = User(req.body.userData);
            user.save(function (err, result) {
              if (err) {
                console.log(err);
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
                const token = jwt.sign(
                  { user: result.email },
                  process.env.JWT_SECRET
                );
                res
                  .cookie("token", token, {
                    httpOnly: true,
                  })
                  .status(200)
                  .send({
                    success: true,
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

/**
 * @desc reseting password of the user
 * @route   POST /api/forgotPassword
 * @param {email , newPass} req
 * @access PUBLIC
 */
exports.forgotPassword = async (req, res) => {};
