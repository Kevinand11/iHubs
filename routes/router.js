const fs = require("fs");
const path = require("path");

module.exports = {
	registerAPIRoutes: (app) => {
		fs.readdirSync(path.join(__dirname , "api"))
			.filter((file) =>
				file.indexOf(".") !== 0 && file.slice(-3) === ".js"
			).forEach((file) => {
				app.use(
					"/api/" + file.slice(0, -3),
					require(path.join(__dirname, "api", file))
				);
			});
		app.use("/api", require(path.join(__dirname, "api", ".js")));
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
