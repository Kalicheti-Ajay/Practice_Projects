const express = require("express");

const {
    getAudits
} = require("../controllers/auditController");

const authenticateToken = require("../middleware/middleware");

const router = express.Router();

router.get("/", authenticateToken, getAudits);

module.exports = router;