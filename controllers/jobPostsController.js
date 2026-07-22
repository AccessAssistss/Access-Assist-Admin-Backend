const { asyncHandler } = require("../utils/asyncHandler");
const { JobPost } = require("../models/jobPostsModel");

const createJobPost = asyncHandler(async (req, res) => {
    try {
        const {
            title,
            location,
            email,
            experience,
            description,
        } = req.body;

        if (!title || !location || !email || !experience || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const jobPost = await JobPost.create({
            title,
            location,
            email,
            experience,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Job post created successfully.",
            data: jobPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

const updateJobPost = asyncHandler(async (req, res) => {
    const { jobPostId } = req.params;

    const {
        title,
        location,
        email,
        experience,
        description,
    } = req.body;

    const jobPost = await JobPost.findOne({
        _id: jobPostId,
        isDeleted: false,
    });

    if (!jobPost) {
        return res.status(404).json({
            success: false,
            message: "Job post not found.",
        });
    }

    if (title !== undefined) {
        jobPost.title = title.trim();
    }

    if (location !== undefined) {
        jobPost.location = location.trim();
    }

    if (email !== undefined) {
        jobPost.email = email.trim().toLowerCase();
    }

    if (experience !== undefined) {
        jobPost.experience = experience.trim();
    }

    if (description !== undefined) {
        jobPost.description = description.trim();
    }

    await jobPost.save();

    return res.status(200).json({
        success: true,
        message: "Job post updated successfully.",
        data: jobPost,
    });
});

const getAllJobs = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();

    const filter = {
        isDeleted: false,
    };

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { experience: { $regex: search, $options: "i" } },
        ];
    }

    const [jobs, total] = await Promise.all([
        JobPost.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        JobPost.countDocuments(filter),
    ]);

    return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully.",
        data: jobs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPreviousPage: page > 1,
        },
    });
});

const softDeleteJobPost = asyncHandler(async (req, res) => {
    try {
        const { jobPostId } = req.params;

        const job = await JobPost.findOne({
            _id: jobPostId,
            isDeleted: false,
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job post not found.",
            });
        }

        job.isDeleted = true;

        await job.save();

        return res.status(200).json({
            success: true,
            message: "Job post deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const changeJobPostStatus = asyncHandler(async (req, res) => {
    const { jobPostId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: "Status is required.",
        });
    }

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be either ACTIVE or INACTIVE.",
        });
    }

    const jobPost = await JobPost.findOne({
        _id: jobPostId,
        isDeleted: false,
    });

    if (!jobPost) {
        return res.status(404).json({
            success: false,
            message: "Job post not found.",
        });
    }

    if (jobPost.status === status) {
        return res.status(400).json({
            success: false,
            message: `Job post is already ${status}.`,
        });
    }

    jobPost.status = status;

    await jobPost.save();

    return res.status(200).json({
        success: true,
        message: `Job post ${status === "ACTIVE" ? "activated" : "INACTIVE"} successfully.`,
        data: jobPost,
    });
});

const getActiveJobPosts = asyncHandler(async (req, res) => {

    const search = req.query.search?.trim();

    const filter = {
        status: "ACTIVE",
        isDeleted: false,
    };

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { experience: { $regex: search, $options: "i" } },
        ];
    }

    const jobPosts = await JobPost.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: "Active job posts fetched successfully.",
        data: jobPosts,
    });
});


module.exports = {
    createJobPost,
    updateJobPost,
    getAllJobs,
    softDeleteJobPost,
    changeJobPostStatus,
    getActiveJobPosts
};