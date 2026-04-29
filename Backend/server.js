const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // ✅ MUST

const authRoutes = require("./routes/authRoutes");
const researchRoutes = require("./routes/researchRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI) // ✅ use ENV only (no localhost here)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("DB Error:", err.message); // show real error
    process.exit(1);
  });

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/admin", adminRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000; // ✅ required for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});