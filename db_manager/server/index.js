const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { api } = require("./api");
const users = require("./users");

app.use(express.json());
app.use(cookieParser());
app.use("/api", api);
app.use("/users", users);

app.listen(8080, () => console.log("app listen to port 8080"));
