const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);

logger.info("connecting to", config.MONGODB_URI);

mongoose.set("useFindAndModify", false);

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
