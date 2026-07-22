const mongoose = require("mongoose");

const jobPostSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        location: {
            type: String,
        },
        email: {
            type: String,
        },
        experience: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = {
    JobPost
};
