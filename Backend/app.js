var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("./config");
var indexRouter = require("./routes/index");
var clientRouter = require("./routes/client");
var lawyerRouter = require("./routes/lawyer");
var courtAuth = require("./routes/court_auth");
var courtHandler = require("./routes/court_handlers");
var cron = require('node-cron');
var transporter = require("./services/mailservice");
const Hearing = require("./models/hearing");
const Cases = require("./models/cases");
var searchRouter = require("./routes/search");
var departmentAdminAuth = require("./routes/department_admin_auth");
var departmentAuth = require("./routes/department_auth");
var departmentHandler = require("./routes/department_handler");
var superAdminHandler = require("./routes/super_admin_handlers");
var secretaryHandler = require("./routes/secretary_handler");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");
// var multer = require('multer');
// const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
// const methodOverride = require("method-override");
// const crypto = require("crypto");
const multerUpload = require("./services/multer_service");

var app = express();
var mongoose = require("mongoose");
var passport = require("passport");

const url = config.mongoUrl;

// var corsOption = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

app.use(cors());
app.use(express.json());

var connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

connect
  .then(() => {
    console.log("Connected to Database");
    // console.log(db);
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("uploads");
    // console.log(gfs);
  })
  .catch((err) => console.log(err));

//Create Storage Engine
// const storage = new GridFsStorage({
//   url: url,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// var upload = multer({ storage });
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "File Does Not Exist",
      });
    }
    console.log("FIle Found");

    // Read Output to Browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

app.get("/dummy", (req, res) => {
  Cases.updateMany({}, { $set: { "mailPeriod": 5 } })
    .then((done) => {
      res.send("Success");
    });
});

app.use("/client", clientRouter);
app.use("/lawyer", lawyerRouter);
app.use("/court", courtAuth);
app.use("/court/cases", courtHandler);
app.use("/search", searchRouter);

app.use("/department/admin", departmentAdminAuth);
app.use("/department/users", departmentAuth);
app.use("/department/users/cases", departmentHandler);

app.use("/superadmin", superAdminHandler)
app.use("/secretary", secretaryHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

cron.schedule('0 0 0 * * *', () => {
  console.log("Runs EveryDay");
  Hearing.find({})
    .then((hearings) => {
      hearings.forEach((hearing) => {
        const date1 = new Date();
        const diffTime = Math.abs(hearing.nexthearingdate - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log(diffDays + " days");
        Cases.findById(hearing.caseid)
          .then((foundCase) => {
            if (foundCase != null) {
              if (foundCase.respondantmail) {
                console.log(foundCase.respondantmail);
                var subject = "Upcoming Hearing Alert";
                var text = "Hello, You have a hearing coming up on " + hearing.nexthearingdate.toDateString() + " for the Case " + foundCase.name;
                console.log(text);
                if (diffDays < (foundCase.mailPeriod + 1)) {
                  sendMail(foundCase.respondantmail, subject, text);
                }
              }
            }
          });
      });
    })
    .catch((err) => console.log(err));
});

function sendMail(receivemail, subject, text) {
  var mailOptions = {
    from: "smartindiahack2020@gmail.com",
    to: receivemail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail Sent Success Fully");
    }
  });
}



module.exports = app;
