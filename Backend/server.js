const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const researchRoutes = require("./routes/researchRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
// this is IMPORTANT for file viewing
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DATABASE ================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/scholarx")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes); // 🔥 this must be present
app.use("/api/admin", adminRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================= SERVER ================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});