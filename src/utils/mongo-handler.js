require("dotenv").config();
require("colors");
const mongoose = require("mongoose");

module.exports = async () => {
  const connection = await mongoose.connect(process.env.MONGO);

  setTimeout(async () => {
    if (connection) {
      return console.log(`✅ MongoDB Database Connected!`.cyan);
    } else {
      return console.log(`❌ MongoDB refused to connect!`.red);
    }
  }, 2000);
};
