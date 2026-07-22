const express = require("express");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const {
  createJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/create", uploadToCloudinary("cv", ["cv"], [1]), createJob);
router.put("/update/:id", uploadToCloudinary("cv", ["cv"], [1]), updateJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-job/:id", getSingleJob);
router.delete("/delete/:id", deleteJob);

module.exports = router;
