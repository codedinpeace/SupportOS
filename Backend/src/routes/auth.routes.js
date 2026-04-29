const express = require("express");
const authRouter = express.Router();

// controllers
const authControllers = require("../controllers/auth.controller");

// routes
authRouter.post("/register", authControllers.registerUser);
authRouter.post("/verify", authControllers.verifyUser);
authRouter.post("/login", authControllers.loginUser);
authRouter.post("/logout", authControllers.logoutUser);
authRouter.get("/get-me", authControllers.getUserData);

module.exports = authRouter;
