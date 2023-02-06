// 1) Import mongoose
const mongoose = require("mongoose");
// 2) Connect to DB (move to server.js to don't write it several time on every model)

// 3) Create schema (structure and type of data)
const StudentsSchema = new mongoose.Schema({
  name: String,
  dept: String,
  id: Number,
});
// 4) Create model
const students = mongoose.model("students", StudentsSchema);

// 5) Export model to controller
module.exports= students