
const Blog = require("../model/blog.model");
const mongoose = require("mongoose");

const cloudinary = require("../utils/cloudinary");

const getDataUri = require("../utils/dataUri");

exports.createBlog = async (req, res) => {
  try {
    const { category, title, about } = req.body;
    console.log("category", category);

    if (!title || !category || !about) {
      return res.status(400).json({
        message: "title, category & about are required fileds",
        success: false,
      });
    }
    if (about.length > 50) {
      return res.status(400).json({
        message: "About words min 50 words",
      });
    }

    const adminId = req.id;
    const adminName = req.user.name;

    const adminPhoto = req.user.photo;

    const file = req.file;
    blogImage = "";
    if (file) {
      const fileUri = getDataUri(file);
      console.log("File URI:", fileUri); // Debug log
      try {
        const cloudeResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        console.log("Cloudinary Response:", cloudeResponse); // Debug log
        blogImage = cloudeResponse.secure_url;
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }
    }

    const blog = await Blog.create({
      title,
      about,
      category,
      createdBy: adminId,
      blogImage,
      adminName,
      adminPhoto,
    });

    return res.status(200).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    return res.status(200).json({
      message: "Get all blogs",
      success: true,
      allBlogs,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }
  await blog.deleteOne();
  res.status(200).json({
    messages: "Blog deleted successfully",
  });
};

exports.getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  return res.status(200).json({
    messages: "you get single Blog",
    blog,
  });
};

exports.getMyBlogs = async (req, res) => {
  const createdBy = req.id;
  const myBlogs = await Blog.find({ createdBy });

  if (!myBlogs) {
    return res.status(400).json({
      message: "Blogs not found",
    });
  }

  return res.status(200).json({
    myBlogs,
  });
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log(userId);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized:  You can only update your own blog",
      });
    }

    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      updateBlog,
    });
  } catch (error) {
    console.log(error);
  }
};
