module.exports = (req, res, next) => {
	let bearer = req.headers["authorization"];
	if (bearer) {
		res.status(400).json({ error: "Logout to continue." }).end();
	} else {
		next();
	}
};
