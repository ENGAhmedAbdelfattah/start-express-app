const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users_Mo_db");
const asyncFunction = require("./../util/asyncFunction");

const user_C = async (req, res, nxt) => {
  try {
    // check aleady exist
    const existUser = await Users.findOne({ email: req.body.email }).exec();
    if (existUser) return res.status(400).send("User already registered!");
    // create new user to mongo db
    //- hash for password by bcrypt
    const salt = await bcrypt.genSalt(10);
    const passHashed = await bcrypt.hash(req.body.password, salt);
    let newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: passHashed,
    });
    // create jwt token for send it and add it to users_C_db to login
    // check JWT_SEC exist in .env
    if (!process.env.JWT_SEC) {
      return res.status(500).send("Requise can't be fullfill");
    }
    // move create token to schema in user_Mo_db in 📁models
    const token = newUser.genAuthToken();
    res.header("x-auth-token", token);
    await newUser.save();
    res.send({ name: newUser.name, email: newUser.email });
  } catch (errs) {
    nxt(errs);
  }
};

module.exports = user_C;
