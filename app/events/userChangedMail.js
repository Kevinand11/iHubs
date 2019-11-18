const EventEmitter = require("events");
let emitter = new EventEmitter();

let { sendVerificationMail } = require("../listeners");

emitter.on("UserChangedMail", sendVerificationMail);

emitter.fire = function(user) {
	this.emit("UserChangedMail", user);
};

module.exports = emitter;
