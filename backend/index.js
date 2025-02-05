const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const cors = require("cors");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3005;

connectDB();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
