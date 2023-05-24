require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });

const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");

//router
const postRoute = require("./routes/postRoutes");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const commentRoute = require("./routes/commentRoutes");
const tagRoute = require("./routes/tagRoute");

//errors
const errorHandlerMiddleware = require("./middleware/errorMiddleware");
const middlewareNotFoundError = require("./middleware/notFound");

// app.use(cors());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors({ credentials: true, origin: "*" }));
// app.use(cors({ origin: "*" }));

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //process.env.JWT_SECRET
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(fileUpload());

// routes
app.use("/posts", postRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
app.use("/tag", tagRoute);

app.use(middlewareNotFoundError);
app.use(errorHandlerMiddleware);

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
