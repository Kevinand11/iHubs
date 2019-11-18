const EventEmitter = require("events");
let emitter = new EventEmitter();

let { sendWelcomeMail, sendVerificationMail } = require("../listeners");

emitter.on("NewUserRegistered", sendWelcomeMail);
emitter.on("NewUserRegistered", sendVerificationMail);

emitter.fire = function(user) {
	this.emit("NewUserRegistered", user);
};

module.exports = emitter;
