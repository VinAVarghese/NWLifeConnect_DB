const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const submissionRoutes = require("./submissions");

router.use("/api/submissions", submissionRoutes);
router.use("/api/auth", authRoutes);

module.exports = router;