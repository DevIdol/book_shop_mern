import dotenv from "dotenv";
import express from "express";
import bodyparser from "body-parser";
import multer from "multer";
import path from "path";
import cors from "cors";
import { connect, disconnection } from "./db.js";
import authRoute from "./Routes/Auth.js";
import userRouter from "./Routes/User.js";
import contactRouter from "./Routes/Contact.js";
import cookieParser from "cookie-parser";
import passwordResetRoute from "./Routes/PasswordReset.js";
import { fileURLToPath } from "url";
import products from "./products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

//mongodb
disconnection;

//image
app.use("/images", express.static(path.join(__dirname, "/images")));
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: fileStorage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).send({ message: "File has been uploaded!" });
});

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1/password-change", passwordResetRoute);
app.get("/products", (req, res) => {
  res.send(products);
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 5000;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
