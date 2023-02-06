const bcrypt = require("bcrypt");
const Users = require("../models/users_Mo_db");
const asyncFunction = require("./../util/asyncFunction");

const user_C = asyncFunction(async (req, res, nxt) => {
  // check email is in user collection in db
  const existUser = await Users.findOne({ email: req.body.email }).exec();
  if (!existUser) return res.status(400).send("Invaild email or password!");
  // check password is in user collection in db for this email
  //- compare password with password in db by bcrypt
  const validPass = await bcrypt.compare(req.body.password, existUser.password);
  if (!validPass) return res.status(400).send("Invaild email or password!");
  // create jwt token for send it and add it to users_C_db to login after Regesration
  // check JWT_SEC exist in .env
  if (!process.env.JWT_SEC) {
    return res.status(500).send("Requise can't be fullfill");
  }
  // move create token to schema in user_Mo_db in 📁models
  const token = existUser.genAuthToken();
  res.header("x-auth-token", token);
  res.send("login successfully");
});
module.exports = user_C;
