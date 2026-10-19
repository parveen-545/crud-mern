const { default: mongoose } = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
  const MONGODB_URI = "mongodb://localhost:27017/bookstore";
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error.message, "database connection failed...");
    });
};

module.exports = databaseConnection;
