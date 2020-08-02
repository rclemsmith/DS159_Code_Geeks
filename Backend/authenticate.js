const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Client = require("./models/client");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const Lawyer = require("./models/lawyer");
const config = require("./config.js");
const Court = require("./models/court");
const Secretary = require("./models/secretary");

const SuperAdmin = require("./models/superadmin");

const DepartmentAdmin = require("./models/deptadmin");
const Department = require("./models/department");

passport.use(
  "secretary",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    Secretary.authenticate()
  )
);
passport.serializeUser(Secretary.serializeUser());
passport.deserializeUser(Secretary.deserializeUser());

passport.use(
  "superadmin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    SuperAdmin.authenticate()
  )
);
passport.serializeUser(SuperAdmin.serializeUser());
passport.deserializeUser(SuperAdmin.deserializeUser());

passport.use(
  "deptadmin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    DepartmentAdmin.authenticate()
  )
);
passport.serializeUser(DepartmentAdmin.serializeUser());
passport.deserializeUser(DepartmentAdmin.deserializeUser());

passport.use(
  "department",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    Department.authenticate()
  )
);
passport.serializeUser(Department.serializeUser());
passport.deserializeUser(Department.deserializeUser());

passport.use(
  "client",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    Client.authenticate()
  )
);
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

passport.use(
  "lawyer",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    Lawyer.authenticate()
  )
);
passport.serializeUser(Lawyer.serializeUser());
passport.deserializeUser(Lawyer.deserializeUser());

passport.use(
  "court",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    Court.authenticate()
  )
);
passport.serializeUser(Court.serializeUser());
passport.deserializeUser(Court.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 36000 });
};



exports.getLawyerToken = function (lawyer) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    Client.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
