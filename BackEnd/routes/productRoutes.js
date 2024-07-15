const express = require("express");
const {
  handleFetchAllProducts,
  handleFetchProductDetails,
} = require("../controller/product");

const router = express.Router();

router.get("/fetchAllProducts", handleFetchAllProducts);

router.get("/fetchProductDetails/:productId", handleFetchProductDetails);

module.exports = router;
