const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    qualification: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    cv: {
      type: String,
    },
    jobRole: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = {
  Job,
};
