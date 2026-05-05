const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected dashboard route
router.get("/", protect, getDashboardStats);

module.exports = router;