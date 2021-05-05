require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    logging: false,
  },
  production: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    logging: false,
  },
};
