var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Case = require("../models/cases");
const Secretary = require("../models/secretary");
const transporter = require("../services/mailservice");
const SuperAdmin = require("../models/superadmin");

router.post("/login", passport.authenticate("secretary"), (req, res) => {
  rand = Math.floor(Math.random() * 100000 + Math.random() * 1000);
  var mailOptions = {
    from: "smartindiahack2020@gmail.com",
    to: req.user.email,
    subject: "Please confirm your Email account",
    text: " This is your OTP for Login : " + rand,
  };

  Case.count(
    { "court.ccategory": "Supreme Court of India", isClosed: false },
    (err, acountSupreme) => {
      Case.count(
        { "court.ccategory": "High Court", isClosed: false },
        (err, acountHigh) => {
          Case.count(
            { "court.ccategory": "District Courts", isClosed: false },
            (err, acountDistrict) => {
              Case.count(
                {
                  "court.ccategory": "Executive and Revenue Court",
                  isClosed: false,
                },
                (err, acountExec) => {
                  Case.count(
                    { "court.ccategory": "Village Court", isClosed: false },
                    (err, acountVillage) => {
                      Case.count(
                        { "court.ccategory": "Panchayat", isClosed: false },
                        (err, acountPanchayat) => {
                          Case.count(
                            {
                              "court.ccategory": "Rural Court",
                              isClosed: false,
                            },
                            (err, acountRural) => {
                              Case.count(
                                {
                                  "court.ccategory": "Judicial Academics",
                                  isClosed: false,
                                },
                                (err, acountJud) => {
                                  Case.count(
                                    {
                                      "court.ccategory":
                                        "Supreme Court of India",
                                      isClosed: true,
                                    },
                                    (err, ccountSupreme) => {
                                      Case.count(
                                        {
                                          "court.ccategory": "High Court",
                                          isClosed: true,
                                        },
                                        (err, ccountHigh) => {
                                          Case.count(
                                            {
                                              "court.ccategory":
                                                "District Courts",
                                              isClosed: true,
                                            },
                                            (err, ccountDistrict) => {
                                              Case.count(
                                                {
                                                  "court.ccategory":
                                                    "Executive and Revenue Court",
                                                  isClosed: true,
                                                },
                                                (err, ccountExec) => {
                                                  Case.count(
                                                    {
                                                      "court.ccategory":
                                                        "Village Court",
                                                      isClosed: true,
                                                    },
                                                    (err, ccountVillage) => {
                                                      Case.count(
                                                        {
                                                          "court.ccategory":
                                                            "Panchayat",
                                                          isClosed: true,
                                                        },
                                                        (
                                                          err,
                                                          ccountPanchayat
                                                        ) => {
                                                          Case.count(
                                                            {
                                                              "court.ccategory":
                                                                "Rural Court",
                                                              isClosed: true,
                                                            },
                                                            (
                                                              err,
                                                              ccountRural
                                                            ) => {
                                                              Case.count(
                                                                {
                                                                  "court.ccategory":
                                                                    "Judicial Academics",
                                                                  isClosed: true,
                                                                },
                                                                (
                                                                  err,
                                                                  ccountJud
                                                                ) => {
                                                                  var actCount =
                                                                    acountDistrict +
                                                                    acountExec +
                                                                    acountHigh +
                                                                    acountJud +
                                                                    acountPanchayat +
                                                                    acountRural +
                                                                    acountSupreme +
                                                                    acountVillage;
                                                                  var cloCount =
                                                                    ccountDistrict +
                                                                    ccountExec +
                                                                    ccountHigh +
                                                                    ccountJud +
                                                                    ccountPanchayat +
                                                                    ccountRural +
                                                                    ccountSupreme +
                                                                    ccountVillage;
                                                                  var totalCount =
                                                                    acountDistrict +
                                                                    acountExec +
                                                                    acountHigh +
                                                                    acountJud +
                                                                    acountPanchayat +
                                                                    acountRural +
                                                                    acountSupreme +
                                                                    acountVillage +
                                                                    ccountDistrict +
                                                                    ccountExec +
                                                                    ccountHigh +
                                                                    ccountJud +
                                                                    ccountPanchayat +
                                                                    ccountRural +
                                                                    ccountSupreme +
                                                                    ccountVillage;
                                                                  transporter.sendMail(
                                                                    mailOptions,
                                                                    function (
                                                                      error,
                                                                      info
                                                                    ) {
                                                                      if (
                                                                        error
                                                                      ) {
                                                                        console.log(
                                                                          error
                                                                        );
                                                                      } else {
                                                                        console.log(
                                                                          "Email sent: " +
                                                                          info.response
                                                                        );
                                                                        const token = authenticate.getToken(
                                                                          {
                                                                            _id:
                                                                              req
                                                                                .user
                                                                                ._id,
                                                                          }
                                                                        );
                                                                        res.statusCode = 200;
                                                                        res.setHeader(
                                                                          "Content-Type",
                                                                          "application/json"
                                                                        );
                                                                        res.json(
                                                                          {
                                                                            success: true,
                                                                            status:
                                                                              "Secretary Login Successful",
                                                                            token: token,
                                                                            userId:
                                                                              req
                                                                                .user
                                                                                ._id,
                                                                            name:
                                                                              req
                                                                                .user
                                                                                .name,
                                                                            otp: rand,
                                                                            actCount: actCount,
                                                                            cloCount: cloCount,
                                                                            supremeCount: {
                                                                              active: acountSupreme,
                                                                              closed: ccountSupreme,
                                                                              total:
                                                                                acountSupreme +
                                                                                ccountSupreme,
                                                                            },
                                                                            highCount: {
                                                                              active: acountHigh,
                                                                              closed: ccountHigh,
                                                                              total:
                                                                                acountHigh +
                                                                                ccountHigh,
                                                                            },
                                                                            districtCount: {
                                                                              active: acountDistrict,
                                                                              closed: ccountDistrict,
                                                                              total:
                                                                                acountDistrict +
                                                                                ccountDistrict,
                                                                            },
                                                                            executiveCount: {
                                                                              active: acountExec,
                                                                              closed: ccountExec,
                                                                              total:
                                                                                acountExec +
                                                                                ccountExec,
                                                                            },
                                                                            villageCount: {
                                                                              active: acountVillage,
                                                                              closed: ccountVillage,
                                                                              total:
                                                                                acountVillage +
                                                                                ccountVillage,
                                                                            },
                                                                            panchayatCount: {
                                                                              active: acountPanchayat,
                                                                              closed: ccountPanchayat,
                                                                              total:
                                                                                acountPanchayat +
                                                                                ccountPanchayat,
                                                                            },
                                                                            ruralCount: {
                                                                              active: acountRural,
                                                                              closed: ccountRural,
                                                                              total:
                                                                                acountRural +
                                                                                ccountRural,
                                                                            },
                                                                            judicialCount: {
                                                                              active: acountJud,
                                                                              closed: ccountJud,
                                                                              total:
                                                                                acountJud +
                                                                                ccountJud,
                                                                            },
                                                                            totalCounts: totalCount,
                                                                          }
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});


router.get("/alltotalCounts", (req, res) => {
  Case.count(
    { "court.ccategory": "Supreme Court of India", isClosed: false },
    (err, acountSupreme) => {
      Case.count(
        { "court.ccategory": "High Court", isClosed: false },
        (err, acountHigh) => {
          Case.count(
            { "court.ccategory": "District Courts", isClosed: false },
            (err, acountDistrict) => {
              Case.count(
                {
                  "court.ccategory": "Executive and Revenue Court",
                  isClosed: false,
                },
                (err, acountExec) => {
                  Case.count(
                    { "court.ccategory": "Village Court", isClosed: false },
                    (err, acountVillage) => {
                      Case.count(
                        { "court.ccategory": "Panchayat", isClosed: false },
                        (err, acountPanchayat) => {
                          Case.count(
                            {
                              "court.ccategory": "Rural Court",
                              isClosed: false,
                            },
                            (err, acountRural) => {
                              Case.count(
                                {
                                  "court.ccategory": "Judicial Academics",
                                  isClosed: false,
                                },
                                (err, acountJud) => {
                                  Case.count(
                                    {
                                      "court.ccategory":
                                        "Supreme Court of India",
                                      isClosed: true,
                                    },
                                    (err, ccountSupreme) => {
                                      Case.count(
                                        {
                                          "court.ccategory": "High Court",
                                          isClosed: true,
                                        },
                                        (err, ccountHigh) => {
                                          Case.count(
                                            {
                                              "court.ccategory":
                                                "District Courts",
                                              isClosed: true,
                                            },
                                            (err, ccountDistrict) => {
                                              Case.count(
                                                {
                                                  "court.ccategory":
                                                    "Executive and Revenue Court",
                                                  isClosed: true,
                                                },
                                                (err, ccountExec) => {
                                                  Case.count(
                                                    {
                                                      "court.ccategory":
                                                        "Village Court",
                                                      isClosed: true,
                                                    },
                                                    (err, ccountVillage) => {
                                                      Case.count(
                                                        {
                                                          "court.ccategory":
                                                            "Panchayat",
                                                          isClosed: true,
                                                        },
                                                        (
                                                          err,
                                                          ccountPanchayat
                                                        ) => {
                                                          Case.count(
                                                            {
                                                              "court.ccategory":
                                                                "Rural Court",
                                                              isClosed: true,
                                                            },
                                                            (
                                                              err,
                                                              ccountRural
                                                            ) => {
                                                              Case.count(
                                                                {
                                                                  "court.ccategory":
                                                                    "Judicial Academics",
                                                                  isClosed: true,
                                                                },
                                                                (
                                                                  err,
                                                                  ccountJud
                                                                ) => {
                                                                  var actCount =
                                                                    acountDistrict +
                                                                    acountExec +
                                                                    acountHigh +
                                                                    acountJud +
                                                                    acountPanchayat +
                                                                    acountRural +
                                                                    acountSupreme +
                                                                    acountVillage;
                                                                  var cloCount =
                                                                    ccountDistrict +
                                                                    ccountExec +
                                                                    ccountHigh +
                                                                    ccountJud +
                                                                    ccountPanchayat +
                                                                    ccountRural +
                                                                    ccountSupreme +
                                                                    ccountVillage;
                                                                  var totalCount =
                                                                    acountDistrict +
                                                                    acountExec +
                                                                    acountHigh +
                                                                    acountJud +
                                                                    acountPanchayat +
                                                                    acountRural +
                                                                    acountSupreme +
                                                                    acountVillage +
                                                                    ccountDistrict +
                                                                    ccountExec +
                                                                    ccountHigh +
                                                                    ccountJud +
                                                                    ccountPanchayat +
                                                                    ccountRural +
                                                                    ccountSupreme +
                                                                    ccountVillage;

                                                                  res.statusCode = 200;
                                                                  res.setHeader(
                                                                    "Content-Type",
                                                                    "application/json"
                                                                  );
                                                                  res.json(
                                                                    {
                                                                      success: true,
                                                                      actCount: actCount,
                                                                      cloCount: cloCount,
                                                                      supremeCount: {
                                                                        active: acountSupreme,
                                                                        closed: ccountSupreme,
                                                                        total:
                                                                          acountSupreme +
                                                                          ccountSupreme,
                                                                      },
                                                                      highCount: {
                                                                        active: acountHigh,
                                                                        closed: ccountHigh,
                                                                        total:
                                                                          acountHigh +
                                                                          ccountHigh,
                                                                      },
                                                                      districtCount: {
                                                                        active: acountDistrict,
                                                                        closed: ccountDistrict,
                                                                        total:
                                                                          acountDistrict +
                                                                          ccountDistrict,
                                                                      },
                                                                      executiveCount: {
                                                                        active: acountExec,
                                                                        closed: ccountExec,
                                                                        total:
                                                                          acountExec +
                                                                          ccountExec,
                                                                      },
                                                                      villageCount: {
                                                                        active: acountVillage,
                                                                        closed: ccountVillage,
                                                                        total:
                                                                          acountVillage +
                                                                          ccountVillage,
                                                                      },
                                                                      panchayatCount: {
                                                                        active: acountPanchayat,
                                                                        closed: ccountPanchayat,
                                                                        total:
                                                                          acountPanchayat +
                                                                          ccountPanchayat,
                                                                      },
                                                                      ruralCount: {
                                                                        active: acountRural,
                                                                        closed: ccountRural,
                                                                        total:
                                                                          acountRural +
                                                                          ccountRural,
                                                                      },
                                                                      judicialCount: {
                                                                        active: acountJud,
                                                                        closed: ccountJud,
                                                                        total:
                                                                          acountJud +
                                                                          ccountJud,
                                                                      },
                                                                      totalCounts: totalCount,
                                                                    }
                                                                  );
                                                                }


                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

router.get("/reports/:departmentName", (req, res) => {
  SuperAdmin.find({ name: req.params.departmentName }).then((admin) => {
    res.status = 200;
    res.setHeader("Content-Type", "application/json");
    console.log(admin[0]);
    if (admin[0]) {
      res.json({
        reports: admin[0].reports,
      });
    } else {
      res.json({
        reports: [],
      });
    }

  });
});

router.get("/typecount/:departmentName/:caseType", (req, res) => {
  Case.count(
    { department: req.params.departmentName, type: req.params.caseType },
    (err, Count) => {
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(Count);
    }
  );
});

router.get("/allcount/:departmentName", (req, res) => {
  Case.count(
    { department: req.params.departmentName, type: "Civil" },
    (err, civilCount) => {
      Case.count(
        { department: req.params.departmentName, type: "Criminal" },
        (err, criminalCount) => {
          res.status = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            civilCount: civilCount,
            criminalCount: criminalCount,
          });
        }
      );
    }
  );
});

router.post("/signup", (req, res, next) => {
  var secretary = new Secretary({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  Secretary.register(secretary, req.body.password, (err, secretary) => {
    console.log("Regsitered");
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("secretary")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Secretary Signup Successful",
          token: token,
          userId: req.user._id,
          name: req.user.name,
        });
      });
    }
  });
});

router.get("/counts/:departmentName", (req, res) => {
  Case.count(
    {
      "court.ccategory": "Supreme Court of India",
      isClosed: false,
      department: req.params.departmentName,
    },
    (err, acountSupreme) => {
      Case.count(
        {
          "court.ccategory": "High Court",
          isClosed: false,
          department: req.params.departmentName,
        },
        (err, acountHigh) => {
          Case.count(
            {
              "court.ccategory": "District Courts",
              isClosed: false,
              department: req.params.departmentName,
            },
            (err, acountDistrict) => {
              Case.count(
                {
                  "court.ccategory": "Executive and Revenue Court",
                  isClosed: false,
                  department: req.params.departmentName,
                },
                (err, acountExec) => {
                  Case.count(
                    {
                      "court.ccategory": "Village Court",
                      isClosed: false,
                      department: req.params.departmentName,
                    },
                    (err, acountVillage) => {
                      Case.count(
                        {
                          "court.ccategory": "Panchayat",
                          isClosed: false,
                          department: req.params.departmentName,
                        },
                        (err, acountPanchayat) => {
                          Case.count(
                            {
                              "court.ccategory": "Rural Court",
                              isClosed: false,
                              department: req.params.departmentName,
                            },
                            (err, acountRural) => {
                              Case.count(
                                {
                                  "court.ccategory": "Judicial Academics",
                                  isClosed: false,
                                  department: req.params.departmentName,
                                },
                                (err, acountJud) => {
                                  Case.count(
                                    {
                                      "court.ccategory":
                                        "Supreme Court of India",
                                      isClosed: true,
                                      department: req.params.departmentName,
                                    },
                                    (err, ccountSupreme) => {
                                      Case.count(
                                        {
                                          "court.ccategory": "High Court",
                                          isClosed: true,
                                          department: req.params.departmentName,
                                        },
                                        (err, ccountHigh) => {
                                          Case.count(
                                            {
                                              "court.ccategory":
                                                "District Courts",
                                              isClosed: true,
                                              department:
                                                req.params.departmentName,
                                            },
                                            (err, ccountDistrict) => {
                                              Case.count(
                                                {
                                                  "court.ccategory":
                                                    "Executive and Revenue Court",
                                                  isClosed: true,
                                                  department:
                                                    req.params.departmentName,
                                                },
                                                (err, ccountExec) => {
                                                  Case.count(
                                                    {
                                                      "court.ccategory":
                                                        "Village Court",
                                                      isClosed: true,
                                                      department:
                                                        req.params
                                                          .departmentName,
                                                    },
                                                    (err, ccountVillage) => {
                                                      Case.count(
                                                        {
                                                          "court.ccategory":
                                                            "Panchayat",
                                                          isClosed: true,
                                                          department:
                                                            req.params
                                                              .departmentName,
                                                        },
                                                        (
                                                          err,
                                                          ccountPanchayat
                                                        ) => {
                                                          Case.count(
                                                            {
                                                              "court.ccategory":
                                                                "Rural Court",
                                                              isClosed: true,
                                                              department:
                                                                req.params
                                                                  .departmentName,
                                                            },
                                                            (
                                                              err,
                                                              ccountRural
                                                            ) => {
                                                              Case.count(
                                                                {
                                                                  "court.ccategory":
                                                                    "Judicial Academics",
                                                                  isClosed: true,
                                                                  department:
                                                                    req.params
                                                                      .departmentName,
                                                                },
                                                                (
                                                                  err,
                                                                  ccountJud
                                                                ) => {
                                                                  var totalCount =
                                                                    acountDistrict +
                                                                    acountExec +
                                                                    acountHigh +
                                                                    acountJud +
                                                                    acountPanchayat +
                                                                    acountRural +
                                                                    acountSupreme +
                                                                    acountVillage +
                                                                    ccountDistrict +
                                                                    ccountExec +
                                                                    ccountHigh +
                                                                    ccountJud +
                                                                    ccountPanchayat +
                                                                    ccountRural +
                                                                    ccountSupreme +
                                                                    ccountVillage;

                                                                  res.statusCode = 200;
                                                                  res.setHeader(
                                                                    "Content-Type",
                                                                    "application/json"
                                                                  );
                                                                  res.json({
                                                                    success: true,
                                                                    department:
                                                                      req.params
                                                                        .departmentName,
                                                                    supremeCount: {
                                                                      active: acountSupreme,
                                                                      closed: ccountSupreme,
                                                                      total:
                                                                        acountSupreme +
                                                                        ccountSupreme,
                                                                    },
                                                                    highCount: {
                                                                      active: acountHigh,
                                                                      closed: ccountHigh,
                                                                      total:
                                                                        acountHigh +
                                                                        ccountHigh,
                                                                    },
                                                                    districtCount: {
                                                                      active: acountDistrict,
                                                                      closed: ccountDistrict,
                                                                      total:
                                                                        acountDistrict +
                                                                        ccountDistrict,
                                                                    },
                                                                    executiveCount: {
                                                                      active: acountExec,
                                                                      closed: ccountExec,
                                                                      total:
                                                                        acountExec +
                                                                        ccountExec,
                                                                    },
                                                                    villageCount: {
                                                                      active: acountVillage,
                                                                      closed: ccountVillage,
                                                                      total:
                                                                        acountVillage +
                                                                        ccountVillage,
                                                                    },
                                                                    panchayatCount: {
                                                                      active: acountPanchayat,
                                                                      closed: ccountPanchayat,
                                                                      total:
                                                                        acountPanchayat +
                                                                        ccountPanchayat,
                                                                    },
                                                                    ruralCount: {
                                                                      active: acountRural,
                                                                      closed: ccountRural,
                                                                      total:
                                                                        acountRural +
                                                                        ccountRural,
                                                                    },
                                                                    judicialCount: {
                                                                      active: acountJud,
                                                                      closed: ccountJud,
                                                                      total:
                                                                        acountJud +
                                                                        ccountJud,
                                                                    },
                                                                    totalCounts: totalCount,
                                                                  });
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

router.get("/cases", (req, res) => {
  Case.find()
    .then((cases) => {
      res.json(cases);
    })
    .catch((err) => res.json(err));
});

router.get("/cases/filter/:departmentName", (req, res) => {
  Case.find({ department: req.params.departmentName })
    .then((cases) => {
      res.json(cases);
    })
    .catch((err) => res.json(err));
});

router.get("/cases", (req, res) => {
  Case.find
    .then((cases) => {
      res.json(cases);
    })
    .catch((err) => res.json(err));
});

router.get("/:caseId/sec", (req, res) => {
  Case.findById(req.params.caseId).then((seccase) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(seccase);
    console.log(seccase);
  });
});

module.exports = router;
