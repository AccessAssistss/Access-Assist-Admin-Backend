const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        image: {
            type: String,
        },
        files: [
            {
                fileName: String,
                fileUrl: String,
            },
        ],
        description: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = {
    Project,
};
