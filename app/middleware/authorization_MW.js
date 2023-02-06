const jwt = require("jsonwebtoken");

module.exports = (req, res, nxt) => {
  // get x-auth-token header
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied!");
  // check user role
  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SEC);
    if (jwtPayload.role !== "admin")
      return res.status(401).send("Access denied!");
    nxt();
  } catch (err) {
    res.status(400).send("Invalid token..");
  }
};
//1) add field => role: "admin" for one user in db
//2) add role in schema db and add role to jwt token gen
//3) add it to student router(studentRstructure_db.js) pipeline
//4) create new rout for admin
