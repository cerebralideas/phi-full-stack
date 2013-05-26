// Test nodemailer settings
module.exports = function (nodemailer) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
	    host: "mailtrap.io", // hostname
	    secureConnection: false, // use SSL
	    port: 2525, // port for secure SMTP
	    auth: {
	        user: "nodecatcher-8a8f683afb984c61",
	        pass: "bdbd8d74e0b62218"
	    }
	});
	return smtpTransport;
};