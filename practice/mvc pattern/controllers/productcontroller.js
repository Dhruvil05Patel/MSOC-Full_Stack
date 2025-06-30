const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "There is no product" });
    }
    res.status(200).json({
      success: true,
      products: allProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const CreateProducts = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(200).json({
      success: true,
      product: newProduct
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const UpdateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getProducts, CreateProducts, UpdateProducts };