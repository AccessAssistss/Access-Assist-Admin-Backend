const { asyncHandler } = require("../utils/asyncHandler");
const { Job } = require("../models/jobModel");

const createJob = asyncHandler(async (req, res) => {
  const { name, phone, email, qualification, state, country, jobRole } = req.body;

  if (!name || !phone || !email || !qualification || !state || !country || !jobRole) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const cv = req.files && req.files["cv"] ? req.files["cv"][0].path : null;

  const job = await Job.create({
    name,
    phone,
    email,
    qualification,
    state,
    country,
    jobRole,
    cv,
  });

  if (!job) {
    res.status(400);
    throw new Error("Job creation failed!");
  }

  res.status(201).json({ message: "Job created successfully!", job });
});

const updateJob = asyncHandler(async (req, res) => {
  const { name, phone, email, qualification, state, country, jobRole } = req.body;
  const jobId = req.params.id;

  if (!name || !phone || !email || !qualification || !state || !country || !jobRole) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const cv = req.files && req.files["cv"] ? req.files["cv"][0].path : null;
  const existingJob = await Job.findById(jobId);

  const job = await Job.findByIdAndUpdate(
    jobId,
    {
      name,
      phone,
      email,
      qualification,
      state,
      country,
      jobRole,
      cv: cv || existingJob.cv,
    },
    { new: true }
  );

  if (!job) {
    res.status(404);
    throw new Error("Job not found!");
  }

  res.status(200).json({ message: "Job updated successfully!", job });
});

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();

  if (jobs.length === 0) {
    res.status(404);
    throw new Error("No jobs found!");
  }

  const totalJobs = jobs.length;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const jobsThisMonth = await Job.find({
    createdAt: {
      $gte: new Date(currentYear, currentMonth - 1, 1),
      $lt: new Date(currentYear, currentMonth, 1),
    },
  }).countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const jobsToday = await Job.find({
    createdAt: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  }).countDocuments();

  res.status(200).json({
    jobs,
    totalJobs,
    jobsThisMonth,
    jobsToday,
  });
});

const getSingleJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found!");
  }

  res.status(200).json(job);
});

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findByIdAndDelete(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found!");
  }

  res.status(200).json({ message: "Job deleted successfully!" });
});

module.exports = {
  createJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  deleteJob,
};
