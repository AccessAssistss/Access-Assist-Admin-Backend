const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  totalCounts,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/count", totalCounts);

module.exports = router;
