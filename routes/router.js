const fs = require("fs");
const path = require("path");
const router = require("express").Router();
//const subdomain = require("express-subdomain");

module.exports = {
	registerAPIRoutes: (app) => {
		fs.readdirSync(path.join(__dirname , "api"))
			.filter((file) =>
				file.indexOf(".") !== 0 && file.slice(-3) === ".js"
			).forEach((file) => {
				router.use(
					`/${file.slice(0, -3)}`,
					require(path.join(__dirname, "api", file))
				);
			});
		router.use("/", require(path.join(__dirname, "api", ".js")));
		app.use("api", router);
	},
	registerWebRoutes: (app) => {
		fs.readdirSync(path.join(__dirname , "web"))
			.filter((file) =>
				file.indexOf(".") !== 0 && file.slice(-3) === ".js"
			).forEach((file) => {
				app.use(
					"/" + file.slice(0, -3),
					require(path.join(__dirname, "web", file))
				);
			});
		app.use("/", require(path.join(__dirname, "web", ".js")));
	}
};
