const express = require("express");
const app = express();
const { getQuestion } = require("./utils");

app.use(express.json());

app.get("/question", (req, res) => {
  getQuestion()
    .then((result) => res.status(200).json(result))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error! we have a problem with our server" })
    );
});
app.get("/answer");
app.post("/update");

app.listen(3000, () => console.log("app listen to port 3000"));
