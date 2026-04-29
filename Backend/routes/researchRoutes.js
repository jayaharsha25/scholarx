const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Research = require("../models/Research");

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= CREATE (UPLOAD) ================= */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const userId = req.headers.userid;

    if (!req.file) {
      return res.status(400).json("File is required");
    }

    const research = await Research.create({
      title: req.body.title,
      abstract: req.body.abstract,
      file: req.file.filename,
      author: userId,
    });

    res.json(research);
  } catch (err) {
    console.log(err);
    res.status(500).json("Upload failed");
  }
});

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const data = await Research.find().populate("author");
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Fetch failed");
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Research.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        abstract: req.body.abstract,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json("Update failed");
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json("Deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Delete failed");
  }
});

module.exports = router;