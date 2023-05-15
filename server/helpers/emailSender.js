let nodemailer = require("nodemailer");
const otpModel  = require("../models/otp");
const { body } = require("express-validator");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "laveshkhairajani01@gmail.com",
    pass: "pzjjxxsudqisevwy",
  },
});

exports.Otpemail = async (body) => {
  let randomOtp = Math.floor(100000 + Math.random() * 900000);
  let data = {};

  let mailOptions = {
    from: "laveshkhairajani01@gmail.com",
    to: `${body.email}`,
    subject: "OTP for your transaction",
    html: `<p>Dear valued customer,</p><p>This email is to inform you that we have sent a one-time password (OTP) to your registered email address/mobile number. Please use the following OTP to complete your transaction: <b>${randomOtp}</b>.</p><p>Please note that the OTP is valid only for a limited time and can only be used once. If you did not initiate this request, please ignore this message and contact our customer support team immediately.</p><p>Thank you for choosing our e-commerce website for your online shopping needs.</p><p>Best regards,</p><p>Lavesh Khairajani </p><p>Customer Support Team</p>`,
  };

  data = {
    email: body.email,
    otp: randomOtp,
  };

  let tempUser = otpModel(data);
  tempUser.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  });
};

exports.passForgotMail = async (body, resetLink) => {
  let mailOptions = {
    from: "laveshkhairajani01@gmail.com",
    to: `${body.email}`,
    subject: "Reset Your Password",
    html: ` <p>Hello,</p>
    <p>We received a request to reset the password associated with this email address.</p>
    <p>To reset your password, please click on the following link:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p>Best regards,<br>Your Company</p>
  `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false;

    } else {
      return true ;
    }
  });
};
