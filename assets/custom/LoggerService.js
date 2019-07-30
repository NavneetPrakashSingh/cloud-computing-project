
module.exports.log = function(log, location) {
    var timestamp = new Date().getTime();
    Logger.create({time:timestamp,log:log, location:location}).exec(function(err) {});
}

var nodemailer = require('nodemailer');

module.exports.sendemail = function(userEmail) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'navneetcloudproject@gmail.com',
          pass: 'nAvneet94'
        }
      });
      
      var mailOptions = {
        from: 'navneetcloudproject@gmail.com',
        to: userEmail,
        subject: 'Cloud Assignment | Documents Status',
        text: 'Congratulations! Your documents are ready! Group 4 (Cloud Nodes)'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}