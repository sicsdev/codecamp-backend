import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(function (req, res, next) {
  let origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin",req.headers.host.indexOf("localhost") > -1? "http://localhost:3000": origin);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

import { DATABASE_URI } from "./config";
import routes from "./routes";
app.use(express.json());
app.use("/api", routes);
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(7000, () => console.log("listen on port 7000.")))
  .catch((error) => console.log("error occured", error));
