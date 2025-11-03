/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to database successfully!`))
  .catch((err) => console.error("DB connection error:", err));

// Sử dụng API routes
const apiRoutes = require("./app/api/api");
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Backend ok rồi đấy</h1><p>mở postman lên mà test!.</p>");
});

// Middleware xử lý lỗi tập trung (đặt sau các route)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Hàm để kết nối DB và khởi động server
const startServer = async () => {
  try {
    // Sửa lỗi ở đây: bỏ `.local`
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to database successfully!`);

    // Chỉ khởi động server sau khi đã kết nối DB
    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(
      "Failed to connect to the database. Server is not starting.",
      err
    );
    process.exit(1);
  }
};

// Gọi hàm để bắt đầu
startServer();
