const mix = require("laravel-mix");
const path = require("path");

mix
	.js("resources/js/app.js", "javascripts/app.js")
	.sass("resources/sass/app.scss", "stylesheets/app.css")
	.webpackConfig({
		output: {
			path: path.join(__dirname, "public"),
			chunkFilename: "javascripts/[name].bundle.js"
		}
	});
