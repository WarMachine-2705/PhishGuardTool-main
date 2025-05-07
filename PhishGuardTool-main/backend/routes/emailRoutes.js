const express = require("express");
const { startMonitoring } = require("../controllers/emailController");

const router = express.Router();

router.post("/start", startMonitoring);

module.exports = router;
