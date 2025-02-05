const express = require("express");
const {
  createBlog,

  deleteBlog,
  getAllBlogs,
  getSingleBlogs,
  getMyBlogs,
  random,
  updateBlog,
} = require("../controller/blog.controller");
const isAuthenticated = require("../middleware/isAutheticated");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/create", singleUpload, isAuthenticated, createBlog);
router.get("/all-blogs", getAllBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

router.get("/single-blog/:id", isAuthenticated, getSingleBlogs);

router.get("/my-blog", isAuthenticated, getMyBlogs);
router.put("/update/:id", isAuthenticated, singleUpload, updateBlog);

module.exports = router;
