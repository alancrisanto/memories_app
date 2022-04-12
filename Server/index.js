import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { postRoutes } from "./routes/posts.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//Connect to mongoDb

// const CONNECTION_URL =

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
  )
  .catch(error => console.log(error.message));
