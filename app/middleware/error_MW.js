module.exports = (errs, req, res) => {
  console.log("error MW");
  // handle promise errors move from controller to error_MW
  console.log("----PROMISE ERRORS----");
  for (let e in errs.errors) {
    console.log(errs.errors[e].message);
  }
  res.status(500).send("Server error");
};
