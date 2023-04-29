const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// routes
app.use("/posts", require("./routes/postRoutes"));
app.use("/auth", require("./routes/userRoutes"));

app.use(errHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
