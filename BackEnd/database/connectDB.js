const mongoose = require("mongoose");
const connectToMongo = () => {
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));
};
module.exports = connectToMongo;
