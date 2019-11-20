module.exports = {
	development: {
		storage: "db/db.sqlite",
		dialect: "sqlite"
	},
	test: {
		storage: "db/db_test.sqlite",
		dialect: "sqlite"
	},
	production: {
		use_env_variable: "DATABASE_URL",
		username: "root",
		database: "database_production",
		dialect: "postgres"
	}
};
