const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { api } = require("./server/api");
const users = require("./server/users");
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(cookieParser());

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build"));
});
app.use("/api", api);
app.use("/users", users);

app.listen(8080, () => console.log("app listen to port 8080"));
