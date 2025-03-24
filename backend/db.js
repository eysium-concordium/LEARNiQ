const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.mongoURI;

const connectToMongo = async() => {
  await mongoose.connect(mongoURI);
};
module.exports = connectToMongo;
