require("dotenv").config();
const { Router } = require("express");
const { hashSync, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const {
  saveNewRegister,
  checkUserExist,
  generateWeightedSavedQuestionArr,
} = require("./utils");
const { historyOfPlayer } = require("./api");
const users = Router();

//Middleware for checking if the token gotten from the req is valid
const validToken = async (req, res, next) => {
  const accessToken = await req.cookie["accessToken"];
  if (!accessToken) {
    return res.status(401).json({ message: "Access token is required" });
  }
  verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    req.user = decoded;
    next();
  });
  console.log(accessToken, refreshToken);
};

//Entry point for create new user
users.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const isExist = await checkUserExist(email);

    if (isExist)
      return res.status(409).json({ message: "User already exists" });

    const hashPassword = hashSync(password, 10);
    await saveNewRegister(email, userName, hashPassword);

    res.status(201).json({ message: "User was successfully created" });
  } catch (err) {
    res.status(400).json({ message: "We have a problem with our server" });
  }
});

///////////////////////////////////////
// users.post("/createuser", (req, res) => {
//   const { user } = req.body;

//   const { difficulty } = req.body;
//   historyOfPlayer.user = user;
//   historyOfPlayer.difficulty = difficulty;
//   historyOfPlayer.score = 0;
//   historyOfPlayer.playerQuestionsAndRates = [];
//   generateWeightedSavedQuestionArr()
//     .then(() => {
//       res.status(200).json({ message: "User was successfully created" });
//     })
//     .catch(() =>
//       res.status(200).json({ massage: "Cannot pull saved questions" })
//     );
// });

//Entry point to verify users when there try to login
users.post("/login", async (req, res) => {
  const { difficulty } = req.body;
  const { email, password } = req.body;
  generateWeightedSavedQuestionArr();
  console.log("after generate");
  try {
    const user = await checkUserExist(email);
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("if !password");
      return res
        .status(403)
        .json({ message: "Email or password is incorrect" });
    }
    historyOfPlayer.user = user.user_name;
    historyOfPlayer.difficulty = difficulty;
    historyOfPlayer.score = 0;
    historyOfPlayer.playerQuestionsAndRates = [];
    const dataOfUser = { email: user.email, userName: user.userName };

    const accessToken = sign(dataOfUser, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = sign(dataOfUser, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({ name: user.user_name });
  } catch (err) {
    res.status(400).json({ message: "We problem with our server" });
  }
});

//Entry point for clearing cookies(refresh token & access token)
users.post("/logout", validToken, (req, res) => {
  res
    // .clearCookie(accessToken)
    .clearCookie(refreshToken)
    .status(200)
    .json({ message: "token cleared" });
});

module.exports = { users, validToken };
