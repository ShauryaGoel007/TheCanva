const express = require("express");

const router = express.Router();

const { checkoutfunc } = require("../controllers/checkoutController");

router.post("/checkout", checkoutfunc);

module.exports = router;
