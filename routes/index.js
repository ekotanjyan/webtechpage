var express = require('express');
var router = express.Router();
var validator = require("email-validator");

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'webtechcsystemsompany@gmail.com',
		pass: 'linaso123'
	}
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMail', function(req, res, next) {
	console.log(req.body)
	if(!req.body.name || !req.body.email || !req.body.subject || !req.body.msg){
		return res.end();
	}

	if(!validator.validate(req.body.email)){
		return res.end();
	}


	var mailOptions = {
	    from: req.body.email,
	    to: '"Message" <webtechcsystemsompany@gmail.com>', 
	    subject: req.body.subject, 
text: 'Name: '+req.body.name+`
` + 'Email: '+req.body.email+`
` + 'Subject: '+req.body.subject+`
` + 'Message: '+req.body.msg 
	};


	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }

	    console.log('Message sent: ' + info.response);
	    res.end();
	});
});

module.exports = router;
