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

//errors
const middlewareErrorHandler = require("./middleware/errorMiddleware");

// app.use(cors());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors({ credentials: true, origin: "*" }));

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

// app.post("/stats", upload.single("image"), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any
//   console.log(req.file, req.body);
// });

// app.use(errHandler);
app.use(middlewareErrorHandler);

const port = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
