const express = require("express");
const { logger } = require("./middlewares");
const app = express();
const routes = require("./routes/routes");

app.use(logger);
app.use(express.json({ extended: true }));

app.use("/api/v1", routes());

module.exports = app;
