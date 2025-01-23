const express = require("express");
const { getScore, updateScore } = require("../controllers/user");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

// Separate routes instead of chaining
router.get("/", authenticateUser, getScore);
router.post("/", authenticateUser, updateScore);

module.exports = router;
