const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const authJwtToken = req.header("token");
    if (!authJwtToken) {
      return res.json({
        message: "authenticate using a valid token",
        success: false,
      });
    }
    const token = jwt.verify(
      authJwtToken,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.json({
            message: "authenticate using a valid token",
            success: false,
          });
        }
        req.user = decoded.user;
        next();
      }
    );
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};
module.exports = { authenticateUser };
