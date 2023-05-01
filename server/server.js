require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");

const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

//router
const postRoute = require("./routes/postRoutes");
const authRoute = require("./routes/authRoutes");

//errors
const middlewareErrorHandler = require("./middleware/errorMiddleware");

app.use(cors());

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //process.env.JWT_SECRET

// routes
app.use("/posts", postRoute);
app.use("/auth", authRoute);

// app.use(errHandler);
app.use(middlewareErrorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
