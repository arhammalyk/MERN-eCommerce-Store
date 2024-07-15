const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  handleSignup,
  handleSignin,
  handleFetchUserData,
} = require("../controller/user");

const { authenticateUser } = require("../middlewares/authenticateUser");

const {
  createUserValidator,
  signinValidator,
} = require("../middlewares/userValidators/user");

const {
  isExistsLogin,
  isUserExist,
} = require("../middlewares/userMiddleware/user");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// create a user using POST "/user/signup/".
router.post(
  "/signup",
  isUserExist,
  // createUserValidator,
  upload.single("profileImage"),
  handleSignup
);

// signin a user using POST "/user/signin/".
router.post("/signin", isExistsLogin, signinValidator, handleSignin);

router.get("/fetchUserData", authenticateUser, handleFetchUserData);

module.exports = router;
