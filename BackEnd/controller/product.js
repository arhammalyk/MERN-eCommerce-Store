const Products = require("../models/product.model");

const handleFetchAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const handleFetchProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { handleFetchAllProducts, handleFetchProductDetails };
