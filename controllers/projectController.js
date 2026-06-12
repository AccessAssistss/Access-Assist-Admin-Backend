const { asyncHandler } = require("../utils/asyncHandler");
const { Project } = require("../models/projectModel");

const createProject = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error("All fields required!");
    }

    const image = req.files["image"]
        ? req.files["image"][0].path
        : null;

    const files = req.files["files"]
        ? req.files["files"].map((file) => ({
              fileName: file.originalname,
              fileUrl: file.path,
          }))
        : [];

    const project = await Project.create({
        title,
        description,
        image,
        files,
    });

    res.status(201).json({
        message: "Project created successfully!",
        project,
    });
});

const updateProject = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const projectId = req.params.id;

    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
        res.status(404);
        throw new Error("Project not found!");
    }

    const image = req.files["image"]
        ? req.files["image"][0].path
        : existingProject.image;

    const files =
        req.files["files"] && req.files["files"].length > 0
            ? req.files["files"].map((file) => ({
                  fileName: file.originalname,
                  fileUrl: file.path,
              }))
            : existingProject.files;

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            title,
            description,
            image,
            files,
        },
        { new: true }
    );

    res.status(200).json({
        message: "Project updated successfully!",
        project,
    });
});

const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({
        createdAt: -1,
    });

    const totalProjects = projects.length;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const projectsThisMonth = await Project.countDocuments({
        createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1),
        },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const projectsToday = await Project.countDocuments({
        createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
    });

    res.status(200).json({
        projects,
        totalProjects,
        projectsThisMonth,
        projectsToday,
    });
});

const getAllActiveProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ status: true }).sort({
        createdAt: -1,
    });

    const totalProjects = projects.length;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const projectsThisMonth = await Project.countDocuments({
        createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1),
        },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const projectsToday = await Project.countDocuments({
        createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
    });

    res.status(200).json({
        projects,
        totalProjects,
        projectsThisMonth,
        projectsToday,
    });
});

const getSingleProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error("Project not found!");
    }

    res.status(200).json(project);
});

const updateProjectStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (status === undefined) {
        res.status(400);
        throw new Error("Status is required!");
    }

    const project = await Project.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!project) {
        res.status(404);
        throw new Error("Project not found!");
    }

    res.status(200).json({
        message: "Project status updated successfully!",
        project,
    });
});

module.exports = {
    createProject,
    updateProject,
    getAllProjects,
    getAllActiveProjects,
    getSingleProject,
    updateProjectStatus,
};