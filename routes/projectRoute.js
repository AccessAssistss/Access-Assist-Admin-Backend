const express = require("express");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const {
    createProject,
    updateProject,
    getAllProjects,
    getSingleProject,
    updateProjectStatus,
    getAllActiveProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.post(
    "/createProject",
    uploadToCloudinary(
        "project",
        ["image", "files"],
        [1, 20]
    ),
    createProject
);

router.put(
    "/updateProject/:id",
    uploadToCloudinary(
        "project",
        ["image", "files"],
        [1, 20]
    ),
    updateProject
);

router.get("/getAllProjects", getAllProjects);
router.get("/getAllActiveProjects", getAllActiveProjects);
router.get("/getSingleProject/:id", getSingleProject);
router.patch("/updateProjectStatus/:id", updateProjectStatus);

module.exports = router;