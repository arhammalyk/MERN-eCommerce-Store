const Users = require("../../models/user.model");

//sign up middleware : if a user already exist with this email return from here no neend to call api
const isUserExist = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user with this account already exists",
        success: false,
      });
    }
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.error(error.message);
  }
};

// signin middleware : if user not found with this email then no need to call ai return from here
const isExistsLogin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Sign in with corrrect credentials", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.error(error.message);
  }
};

module.exports = { isUserExist, isExistsLogin };
