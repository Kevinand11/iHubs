const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const logger = require("morgan");
const env = process.env.NODE_ENV === "production" ? process.env : require("dotenv").config().parsed;

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
	limits: { fileSize: env["FILE_UPLOAD_LIMIT"] * 1024 * 1024 },
	useTempFiles: true,
	tempFileDir: path.join(__dirname, "storage", "tmp")
}));
app.use(express.static(path.join(__dirname, "public")));

// register routes
let router = require("./routes/router");
router.registerAPIRoutes(app);
router.registerWebRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
let { error_handler } = require("./app/middlewares");
app.use(error_handler);

module.exports = app;
