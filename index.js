const app = require("./app");
const { logger } = require("./helpers");
require("dotenv").config();

const db = require("./config/db");

const port = process.env.PORT || 3000;

db();

app.listen(port, () => logger.log(`Server is running on port`, port));
