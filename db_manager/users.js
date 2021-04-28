require("dotenv").config();
const { Router } = require("express");
const { hashSync, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { saveNewRegister, checkUserExist } = require("./utils");

const users = Router();

//Entry point for create new user
users.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const isExist = await checkUserExist(email);

    if (isExist) return res.status(409).json({ message: "User already exist" });

    const hashPassword = hashSync(password, 10);
    await saveNewRegister(email, userName, hashPassword);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: "We problem with our server" });
  }
});

//Entry point to verify users when there try to login
users.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkUserExist(email);
    const dataOfUser = { email: user.email, userName: user.userName };

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: "Email or password is incorrect" });
    }

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
      .json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: "We problem with our server" });
  }
});

module.exports = users;
