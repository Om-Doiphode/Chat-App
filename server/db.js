const mongoose = require("mongoose");
require("dotenv").config();
const key = process.env.KEY;
const mongoURI = `mongodb+srv://Om:${key}@cluster0.voabydv.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongo;
