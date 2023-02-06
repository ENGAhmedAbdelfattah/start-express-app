const { join } = require("path");
const app = require("express").Router();
const indexController = require(join(__dirname, "../controllers/index"));
const { getHelloWorld } = indexController;

app.get("/", (req, res) => getHelloWorld(req, res));

app.all("/api/", (req, res, nxt) => {
  console.log("Router for all request method");
  nxt();
}); //for MW for all method(GET,POST,PUT,DELETE,...) for this router

app.get("*", (req, res, nxt) => {
  console.log("get router");
  nxt();
}); //for MW for all get method on this router
app.param("id", (req, res, nxt, val) => {
  // for validation of parameter
  if (Number(val)) {
    console.log("Router with param");
    // for add param as prop for req
    req.id = val;
    nxt();
  } else {
    res.status(403).send("invalid id");
  }
}); //for MW for all method by param on this router

app.param("id", (req, res, nxt, val) => {
  // for validation of parameter
  if (/^[0-9a-fA-F]{24}$/.test(val)) {
    console.log("Router with param");
    // for add param as prop for req
    req.id = val;
    nxt();
  } else {
    res.status(403).send("invalid id");
  }
}); //for MW for all method by param on this router with DB

module.exports = app;
