const express = require("express");
const { getScore, updateScore, getSuggestions } = require("../controllers/user");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

// Separate routes instead of chaining
router.get("/", authenticateUser, getScore);
router.post("/", authenticateUser, updateScore);
router.get("/suggestions", authenticateUser, getSuggestions);

module.exports = router;
