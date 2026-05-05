const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CRM Backend API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

module.exports = app;