const jwt = require("jsonwebtoken");
import helpController from "../Controller/helpController";
import Signup from "../model/Signup";
// const config = process.env;
const SECRET_KEY= "MYSECRETKEY"

const auth = async(req, res, next) => {
  const token =
    req.headers["token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await jwt.verify(token,SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default auth;