const express = require("express");

const router = express.Router();

const { loginUser, signupUser } = require("../controllers/useController");

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

module.exports = router;
