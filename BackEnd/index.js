require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database/connectDB");
connectToMongo();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

const PORT = process.env.PORT || 3003;
const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}; 

const app = express();

app.use(cors(corsOption));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", stripeRoutes);

app.use("*", (req, res) => {
  return res.send("no url found");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
