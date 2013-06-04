var nodemailer = require('nodemailer'),
	transport = require('../config/nodemailer')(nodemailer);

exports.generic = function() {

	"use strict";

	var mailOptions = {
		from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
		to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world ✔", // plaintext body
		html: "<b>Hello world ✔</b>" // html body
	};

	transport.sendMail(mailOptions, function(error, response) {

		if (error) {
			console.log(error);
		} 
		else {
			console.log("Message sent: " + response.message);
		}

	});
};