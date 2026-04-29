const Research = require("../models/Research");

exports.createResearch = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No file uploaded");

    const research = await Research.create({
      title: req.body.title,
      abstract: req.body.abstract,
      file: req.file.filename,
      author: req.user.id,
    });

    res.json(research);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.getAllResearch = async (req, res) => {
  const data = await Research.find().populate("author", "name");
  res.json(data);
};