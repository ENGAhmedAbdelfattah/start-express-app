/* Require */
//-- require build-in modules
const { join } = require("path");
//-- require third party modules
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const pug = require("pug");
const mongoose = require("mongoose");
//-- Load environment variable
const dotenv = require("dotenv").config({
  path: join(__dirname, "./.env"),
});
/* handle errors out MW */
process.on("uncaughtException", (exception) => {
  console.log("uncaught Exception", exception);
  process.exit(1);
});
process.on("unhandledRejection", (exception) => {
  console.log("Promise Rejected", exception);
  process.exit(1);
});
// ____________________________________________________________________________________
/* Create App Server */
const app = express();
// ____________________________________________________________________________________
// =>) Connect to DB (move from medel to server.js to don't write it several time on every model)
mongoose.set("strictQuery", true);
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/iti";

main()
  .then((_) => console.log("MONGODB_IS_CONNECTED .."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/iti");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// ____________________________________________________________________________________
/* Express Setting*/
// for all app set on this link : https://expressjs.com/en/4x/api.html#app.set
app.set("views", join(__dirname, "../app/views/"));
app.set("view engine", "pug");
// ____________________________________________________________________________________
/* MiddleWare */
// express MW
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/assets", express.static(join(__dirname, "../app/public")));
// third party MW for all
app.use(helmet());
app.use(cookieParser());
// ____________________________________________________________________________________
/* Express Routers and Error Handle MW in app.js*/
// ____________________________________________________________________________________
/*Export server to app.js */
module.exports = app;

// steps for every router:
// ) create router
// ) create controllers
// ) create util and MW ex validator and add it to router pipeline
// ) create model to create schema for db
// ) write code for controller for handle request with db
