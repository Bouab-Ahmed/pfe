require("dotenv").config();
require("express-async-errors");

const express = require("express");
const colors = require("colors");

const { errHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const middlewareErrorHandler = require("./middleware/errorMiddleware");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// routes
app.use("/posts", require("./routes/postRoutes"));
app.use("/auth", require("./routes/userRoutes"));

// app.use(errHandler);
app.use(middlewareErrorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`server connect at port ${port}`));
};

start();
