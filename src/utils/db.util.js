const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("connection successful");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectdb };
