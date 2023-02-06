// *) Import packages
const valid = require("validator");
const jwt = require("jsonwebtoken");

// 1) Import mongoose
const mongoose = require("mongoose");
// 2) Connect to DB (move to server.js to don't write it several time on every model)

// 3) Create schema (structure and type of data)
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) => valid.isAlpha(val),
      message: "{VALUE} is not valid name",
    },
    require: true,
    tirm: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    validate: {
      validator: (val) => valid.isEmail(val),
      message: "{VALUE} is not valid email",
    },
    require: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: (val) => valid.isStrongPassword(val),
      message: "{VALUE} is not strong password",
    },
    require: true,
  },
  role: {
    type: String,
    validate: {
      validator: (val) => valid.isAlpha(val),
      message: "{VALUE} is not valid Role",
    },
  },
});
//create token
UsersSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SEC
  );
  return token;
};
// or
// UsersSchema.method("genAuthToken", function () {
//   const token = jwt.sign({ userId: this._id }, process.env.JWT_SEC);
//   return token;
// });
// 4) Create model
const Users = mongoose.model("users", UsersSchema);
// 5) Export model to controller
module.exports = Users;
