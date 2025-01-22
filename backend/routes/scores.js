const express = require("express");
const { getScore, updateScore } = require("../controllers/scores");
const { authMiddleware } = require("../middleware/authentication");
const router = express.Router();

router.get("/", authMiddleware, getScore).post("/", authMiddleware, updateScore);

module.exports = router;
