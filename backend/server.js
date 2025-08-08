const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Kết nối tới MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to database successfully!`))
  .catch((err) => console.error("DB connection error:", err));

// Sử dụng API routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
