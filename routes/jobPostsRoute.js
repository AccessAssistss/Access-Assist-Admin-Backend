const express = require("express");
const { createJobPost, updateJobPost, getAllJobs, softDeleteJobPost, changeJobPostStatus, getActiveJobPosts } = require("../controllers/jobPostsController");

const router = express.Router();

router.post("/create-jobpost", createJobPost)
router.put("/update-jobpost/:jobPostId", updateJobPost)
router.get("/get-all-jobposts", getAllJobs)
router.delete("/delete-jobPost/:jobPostId", softDeleteJobPost)
router.patch("/update-status/:jobPostId", changeJobPostStatus)
router.get("/get-active-jobposts", getActiveJobPosts)

module.exports = router;
