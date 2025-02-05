const User = require("../model/user.model");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, name, password, phone, education, role } = req.body;
    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({
        message: "Please fill required field",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const file = req.file;
    let photo = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      photo = cloudResponse.secure_url;
    }

    user = await User.create({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Somthing is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Accound doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      photo: user.photo,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

exports.getAllAdmins = async (req, res) => {
  const adminsAll = await User.find({ role: "admin" });
  return res.status(200).json({
    adminsAll,
  });
};
