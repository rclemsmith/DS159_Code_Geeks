var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");

const Department = require("../models/department");
const transporter = require("../services/mailservice");

router.post("/login", passport.authenticate("department"), (req, res) => {
  rand = Math.floor(Math.random() * 100000 + Math.random() * 1000);
  var mailOptions = {
    from: "smartindiahack2020@gmail.com",
    to: req.user.email,
    subject: "Please confirm your Email account",
    text: " This is your OTP for Login : " + rand,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);

      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Department Login Successful",
        token: token,
        userId: req.user._id,
        name: req.user.name,
        otp: rand,
        officialname : req.user.officialname
      });
    }
  });
});

router.delete("/:userId",(req,res)=>{
  Department.findByIdAndDelete(req.params.userId,(err,deletedUser)=>{
    if(err){
      res.json(err);
    }else{
      res.json(deletedUser);
    }
  });
});

router.post("/changepassword", (req, res) => {
  Department.findOne({ username: req.body.username }, (err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: "User not found" }); // Return error, user was not found in db
      } else {
        user.changePassword(req.body.password, req.body.newpassword, function (
          err
        ) {
          if (err) {
            if (err.name === "IncorrectPasswordError") {
              res.json({ success: false, message: "Incorrect password" }); // Return error
            } else {
              res.json({
                success: false,
                message:
                  "Something went wrong!! Please try again after sometimes.",
              });
            }
          } else {
            res.json({
              success: true,
              message: "Department password has been changed successfully",
            });
          }
        });
      }
    }
  });
});

router.post("/signup", (req, res, next) => {
  var department = new Department({
    username: req.body.username,
    name: req.body.name,
    officialname: req.body.officialname,
    email: req.body.email,
  });
  Department.register(department, req.body.password, (err, department) => {
    console.log("Regsitered");
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("department")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Department Login Successful",
          token: token,
          userId: req.user._id,
          name: req.user.name,
        });
      });
    }
  });
});

router.get("/officials/:dept", (req, res) => {
  Department.find({ name: req.params.dept }, (err, foundDept) => {
    if (err) {
      res.json(err);
    } else {
      res.statusCode = 200;
      res.json(foundDept);
    }
  });
});

module.exports = router;
