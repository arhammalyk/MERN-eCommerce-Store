const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Products = require("../models/product.model");
const Orders = require("../models/order.model");

const handleCreateCheckoutSession = async (req, res) => {
  try {
    const user = req.user;
    const { cartItems, currency, paymentMethodId } = req.body;

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Products.findById(item._id, "price productName");
        if (!product) {
          throw new Error(`Product not found for ID: ${item._id}`);
        }
        return {
          _id: item._id,
          quantity: item.quantity,
          productName: product.productName,
          price: product.price,
        };
      })
    );

    const amount = calculateTotalAmount(items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.CLIENT_URL}/orderSummary`,
      description: `Payment for ${user.email}`,
    });

    // Update product quantities in the database
    await updateProductQuantities(items);

    //create order
    const order = await createOrder(paymentIntent, items, amount, user);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const updateProductQuantities = async (items) => {
  try {
    // Loop through each item and update the quantity in the database
    await Promise.all(
      items.map(async (item) => {
        const product = await Products.findById(item._id);
        if (!product) {
          throw new Error(`Product not found for ID: ${item._id}`);
        }
        // Reduce the quantity by the amount purchased
        product.quantity -= item.quantity;
        await product.save();
      })
    );
  } catch (error) {
    console.error("Error updating database:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

const createOrder = async (paymentIntent, items, amount, user) => {
  try {
    const order = new Orders({
      receiptEmail: user.email,
      status: paymentIntent.status,
      totalPrice: paymentIntent.amount_received / 100,
      productList: items.map((item) => ({
        productId: item._id,
        product: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethodType: paymentIntent.payment_method_types[0],
      userId: user.id,
    });

    await order.save();
    return order;
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { handleCreateCheckoutSession };
