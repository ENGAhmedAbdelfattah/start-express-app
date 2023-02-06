// *) Import validator package
const valid = require("validator");
// 1) Import mongoose
const mongoose = require("mongoose");
// 2) Connect to DB (move to server.js to don't write it several time on every model)

// 3) Create schema (structure and type of data)
const usersSchema = new mongoose.Schema({
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
});
// 4) Create model
const users = mongoose.model("users", usersSchema);

// 5) Export model to controller
module.exports = users;
