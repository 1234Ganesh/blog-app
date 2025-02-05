const express = require("express");
const {
  register,
  login,
  logout,
  getMyProfile,
  getAllAdmins,
} = require("../controller/user.controller");
const { singleUpload } = require("../middleware/multer");
const isAuthenticated = require("../middleware/isAutheticated");

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAllAdmins);

module.exports = router;
