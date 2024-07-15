const express = require("express");
const bodyParser = require("body-parser");

const { authenticateUser } = require("../middlewares/authenticateUser");
const {
  handleCreateCheckoutSession,
} = require("../controller/stripeController");

const router = express.Router();

router.post(
  "/createCheckoutSession",
  authenticateUser,
  handleCreateCheckoutSession
);

module.exports = router;
