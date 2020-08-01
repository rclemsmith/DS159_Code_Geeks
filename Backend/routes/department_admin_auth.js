var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
var multer = require("multer");

const multerUpload = require("../services/multer_service");
const Case = require("../models/cases");
const DepartmentAdmin = require("../models/deptadmin");
const SuperAdmin = require("../models/superadmin");
const Hearing = require("../models/hearing");
const transporter = require("../services/mailservice");

router.post("/login", passport.authenticate("deptadmin"), (req, res) => {
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
        status: "Nodal Officer Login Successful",
        token: token,
        userId: req.user._id,
        name: req.user.name,
        otp: rand,
      });
    }
  });
});

router.get("/nodal/:dept", (req, res) => {
  console.log(req.params.dept);
  DepartmentAdmin.find({ name: req.params.dept }, (err, foundDept) => {
    if (err) {
      res.json(err);
    } else {
      res.statusCode = 200;
      res.json(foundDept);
      console.log(foundDept);
    }
  });
});

router.delete("/:userId", (req, res) => {
  DepartmentAdmin.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err) {
      res.json(err);
    } else {
      res.json(deletedUser);
    }
  });
});

router.post("/changepassword", (req, res) => {
  DepartmentAdmin.findOne({ username: req.body.username }, (err, user) => {
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
              message:
                "Department Admin password has been changed successfully",
            });
          }
        });
      }
    }
  });
});

router.post("/signup", (req, res, next) => {
  var departmentAdmin = new DepartmentAdmin({
    username: req.body.username,
    name: req.body.name,
    nodalname: req.body.nodalname,
    email: req.body.email,
  });
  DepartmentAdmin.register(departmentAdmin, req.body.password, (err, admin) => {
    console.log("Regsitered");
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("deptadmin")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Nodal Officer Login Successful",
          token: token,
          userId: req.user._id,
          name: req.user.name,
        });
      });
    }
  });
});

//@route
//@description create newcase route
// router.post("/:userId/newCase", (req, res, next) => {
//      var author = {
//         id: req.params.userId,
//       };
//       var lawyerr = {
//         name: req.body.lawyername,
//         uid: req.body.lawyerid,
//       };

//       var courtt = {
//         id: found[0]._id,
//       };

//       var newCase = new PendingCase({
//         name: req.body.casename,
//         type: req.body.type,
//         facts: req.body.facts,
//         lawyer: lawyerr,
//         author: author,
//         court: courtt,
//       });

//       PendingCase.create(newCase)
//         .then((mycase) => {
//           console.log(mycase);
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(mycase);
//         })

//         .catch((err) => console.log(err));

//   });
// });

//@route
//@description add case

router.delete("/:caseId/delete", (req, res) => {
  Case.findByIdAndDelete(req.params.caseId, (err, deletedCase) => {
    var now = new Date();
    var report =
      " The Nodal Officer has deleted a case called " +
      deletedCase.name +
      " at " +
      now;
    SuperAdmin.findOneAndUpdate(
      { name: deletedCase.department },
      {
        $push: {
          reports: report,
        },
      },
      (err, updatedAdmin) => {
        console.log(updatedAdmin);
        res.json(deletedCase);
      }
    );
  });
});

router.post(
  "/:userId/addCase",
  multerUpload.single("image"),
  (req, res, next) => {
    var lawyer = {
      lname: req.body.lname,
      gender: req.body.gender,
      exp: req.body.exp,
      qualification: req.body.qualification,
      mobile: req.body.mobile,
      email: req.body.email,
      uid: req.body.uid,
      casesWon: req.body.won,
      caseslost: req.body.lost,
      skills: req.body.skills,
      street: req.body.street,
      district: req.body.district,
      state: req.body.state,
      pincode: req.body.pincode,
      image: req.file.filename,
    };
    var court = {
      cname: req.body.cname,
      ccategory: req.body.category,
      cdistrict: req.body.codistrict,
      cstate: req.body.costate,
      cpincode: req.body.copincode,
    };

    var addCase = new Case({
      admin: req.body.admin,
      name: req.body.casename,
      type: req.body.casetype,
      opposition: req.body.opposition,
      facts: req.body.facts,
      status: req.body.status,
      isClosed: req.body.isClosed,
      department: req.body.department,
      lawyer: lawyer,
      court: court,
      judge: req.body.judge,
    });

    Case.create(addCase)
      .then((mycase) => {
        console.log(mycase);
        DepartmentAdmin.findById(req.params.userId, (err, foundAdmin) => {
          if (err) {
            res.json(err);
          } else {
            var now = new Date();
            var report =
              " The Nodal Officer " +
              foundAdmin.nodalname +
              " has added a new case called " +
              mycase.name +
              " at " +
              now;
            console.log(report);
            SuperAdmin.findOneAndUpdate(
              { name: req.body.department },
              {
                $push: {
                  reports: report,
                },
              },
              (err, updatedAdmin) => {
                console.log(updatedAdmin);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(mycase);
              }
            );
          }
        });
      })
      .catch((err) => console.log(err));
  }
);

router.get("/active/:departmentName", (req, res) => {
  Case.find(
    { department: req.params.departmentName, isClosed: false },
    (err, foundCases) => {
      if (err) {
        res.json(err);
      } else {
        res.statusCode = 200;

        res.setHeader("Content-Type", "application/json");
        res.json(foundCases);
        console.log(foundCases);
        console.log(req.params.departmentName);
      }
    }
  );
});

router.get("/closed/:departmentName", (req, res) => {
  Case.find(
    { department: req.params.departmentName, isClosed: true },
    (err, foundCases) => {
      if (err) {
        res.json(err);
      } else {
        res.statusCode = 200;
        res.json(foundCases);
      }
    }
  );
});

router.get("/:caseId/casedetails", (req, res, next) => {
  Case.findById(req.params.caseId)
    .then((curcase) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(curcase);
    })
    .catch((err) => console.log(err));
});

router.post(
  "/:caseId/hearing",
  multerUpload.array("documents", 10),
  (req, res) => {
    // console.log(req.files);
    console.log(req.user);
    try {
      var documents = [];
      req.files.forEach((file) => {
        documents.push(file.filename);
      });
      console.log(documents);

      console.log(req.body);
      var witness1 = JSON.parse(req.body.witness);
      witness1.forEach((wit) => console.log(wit));
      console.log(witness1);

      var hearing = new Hearing({
        caseid: req.params.caseId,
        curhearingdate: req.body.curdate,
        curhearingfacts: req.body.curfact,
        curhearingjudge: req.body.judge,
        curhearinglawyer: req.body.curlawyer,
        curhearingverdict: req.body.verdict,
        nexthearingdate: req.body.nexthearing,
        documents: documents,
      });

      hearing.curhearingwitness.push.apply(hearing.curhearingwitness, witness1);
      console.log(hearing);

      Hearing.create(hearing)
        .then((curhear) => {
          console.log(curhear);
          Case.findById(req.params.caseId, (err, foundCase) => {
            var now = new Date();
            var report =
              " A new Hearing has been added to a case called " +
              foundCase.name +
              " at " +
              now;
            SuperAdmin.findOneAndUpdate(
              { name: foundCase.department },
              {
                $push: {
                  reports: report,
                },
              },
              (err, updatedAdmin) => {
                console.log(updatedAdmin);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(curhear);
              }
            );
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/:caseId/hearing", (req, res) => {
  Hearing.find({ caseid: req.params.caseId }).then((curhearing) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(curhearing);
  });
});

router.post("/:hearingId/update", (req, res) => {
  var witness1 = req.body.witness;
  console.log(witness1);
  Hearing.findByIdAndUpdate(
    req.params.hearingId,
    {
      $set: {
        curhearingdate: req.body.curdate,
        curhearingfacts: req.body.curfact,
        curhearingjudge: req.body.judge,
        curhearinglawyer: req.body.curlawyer,
        curhearingverdict: req.body.verdict,
        nexthearingdate: req.body.nexthearing,
      },
      $push: { curhearingwitness: witness1 },
    },
    (err, updated) => {
      if (err) {
        res.json(err);
      } else {
        Case.findById(updated.caseid, (err, foundCase) => {
          var now = new Date();
          var report =
            " An Hearing has been Updated to a case called " +
            foundCase.name +
            " at " +
            now;
          SuperAdmin.findOneAndUpdate(
            { name: foundCase.department },
            {
              $push: {
                reports: report,
              },
            },
            (err, updatedAdmin) => {
              console.log(updatedAdmin);
              res.send("Success");
            }
          );
        });
      }
    }
  );
});

router.post("/:caseId/lupd", multerUpload.single("image"), (req, res) => {
  var lawyer = {
    lname: req.body.lname,
    exp: req.body.exp,
    qualification: req.body.qualification,
    mobile: req.body.mobile,
    email: req.body.email,
    uid: req.body.uid,
    street: req.body.street,
    district: req.body.district,
    state: req.body.state,
    pincode: req.body.pincode,
    image: req.file.filename,
  };
  console.log(lawyer);
  Case.findByIdAndUpdate(
    req.params.caseId,
    {
      $set: {
        lawyer: lawyer,
      },
    },
    (err, updated) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else {
        var now = new Date();
        var report =
          " The Layer for the case " +
          foundCase.name +
          " was updated at " +
          now;
        SuperAdmin.findOneAndUpdate(
          { name: updated.department },
          {
            $push: {
              reports: report,
            },
          },
          (err, updatedAdmin) => {
            console.log(updatedAdmin);
            res.send("Success");
          }
        );
      }
    }
  );
});

router.post("/:caseId/modify", (req, res) => {
  Case.findByIdAndUpdate(
    req.params.caseId,
    {
      $set: {
        facts: req.body.facts,
        status: req.body.status,
        isClosed: req.body.isClosed,
      },
    },
    (err, updated) => {
      if (err) {
        res.json(err);
      } else {
        var now = new Date();
        var report =
          " The case called" + updated.name + " was updated at " + now;
        SuperAdmin.findOneAndUpdate(
          { name: updated.department },
          {
            $push: {
              reports: report,
            },
          },
          (err, updatedAdmin) => {
            console.log(updatedAdmin);
            res.send("Success");
          }
        );
      }
    }
  );
});

router.get("/cases/:departmentName", (req, res) => {
  Case.find({ department: req.params.departmentName }, (err, foundCases) => {
    if (err) {
      res.json(err);
    } else {
      res.statusCode = 200;
      res.json(foundCases);
    }
  });
});

module.exports = router;
