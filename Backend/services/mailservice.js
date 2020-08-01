var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smartindiahack2020@gmail.com',
    pass: 'smartindiahack'
  }
});


module.exports = transporter;