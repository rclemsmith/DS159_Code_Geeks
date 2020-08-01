var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
/* GET users listing. */
var Lawyer = require("../models/lawyer");
const { route } = require(".");
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", passport.authenticate("lawyer"), function (
  req,
  res,
  next
) {
  const token = authenticate.getToken({ _id: req.user._id });
  res.cookie("token", token, { httpOnly: true });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    status: "Lawyer Login Successful!",
    token: token,
    userId: req.user._id,
    name: req.user.name,
  });
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  Lawyer.register(
    new Lawyer({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      dob: req.body.dob,
      address: req.body.address,
      gender: req.body.gender,
      uid: req.body.uid,
      qualification: req.body.qualification,
    }),
    req.body.password,
    (err, lawyer) => {
      if (err) {
        res.status = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
        console.log(err);
      } else {
        passport.authenticate("lawyer")(req, res, () => {
          console.log(req.user);
          const token = authenticate.getToken({ _id: req.user._id });
          res.cookie("token", token, { httpOnly: true });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Login Successful!",
            token: token,
            userId: req.user._id,
            name: req.user.name,
          });
        });
      }
    }
  );
});

//get all lawyers
router.get("/lawyer", (req, res, next) => {
  Lawyer.find()
    .then((lawyer) => res.json(lawyer))
    .catch((err) => res.status(400).json({ nolawyer: "nolawyer" }));
});

router.get("/:lawyerId/profile", (req, res, next) => {
  Lawyer.findById(req.params.lawyerId)
    .then(
      (lawyer) => {
        if (lawyer != null) {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/json");
          res.json(lawyer);
        } else {
          err = new Error("User" + req.params.lawyerId + "not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = router;
