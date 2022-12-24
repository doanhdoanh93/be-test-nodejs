import express from "express";

import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import cors from "cors";

import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);
connectDB();

let port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log("hahaha http://localhost:" + port);
});
