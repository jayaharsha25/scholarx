const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user",
    });

    res.json("Registered successfully");

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Wrong password");

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};