const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("cv"), async (req, res) => {
    try {
        console.log("File:", req.file);

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "cv",
            resource_type: "auto",
        });

        return res.json(result);
    } catch (err) {
       
  console.log("Status:", err.http_code);
  console.dir(err, { depth: null });

  if (err.response) {
    console.log("Response:", err.response);
  }

  res.status(500).json({
    message: err.message,
    http_code: err.http_code,
    response: err.response || null,
  });
}
    
});

module.exports = router;