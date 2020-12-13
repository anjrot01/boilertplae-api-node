require("dotenv").config();
const mongoose = require("mongoose");
const { logger } = require("../helpers");

const dbPath = process.env.DB_PATH;

const dbConfig = async () => {
  try {
    await mongoose.connect(dbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    logger.log(`Db Connected on`, dbPath);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = dbConfig;
