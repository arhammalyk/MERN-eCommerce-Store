const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Products = require("../models/product.model");

const handleSignup = async (req, res) => {
  try {
    // await Products.create({
    //   productName:'samsung',
    //   quantity:5,
    //   price:50000,
    // })
    const { firstName, lastName, userName, email, password, gender } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    await Users.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: hash,
      gender: gender,
      profileImage: profileImage,
    });
    return res.json({ message: "successfully signed up", success: true });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const handleSignin = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordcompare = await bcrypt.compare(password, req.user.password);
    if (!passwordcompare) {
      return res.status(400).json({
        error: "Please try to login with correct Credentials",
        success: "false",
      });
    }
    const tokenData = {
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    };
    const options = {
      expiresIn: "2h",
    };
    //generating a token
    const authJwtToken = jwt.sign(tokenData, process.env.JWT_SECRET, options);
    return res.json({ success: true, authJwtToken });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const handleFetchUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password").lean();

    if (!user) {
      return res.json({ message: "no data found", success: false });
    }
    return res.json({ user, success: true });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  handleSignup,
  handleSignin,
  handleFetchUserData,
};
