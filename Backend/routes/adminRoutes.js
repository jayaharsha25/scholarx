const router = require("express").Router();
const User = require("../models/user");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;