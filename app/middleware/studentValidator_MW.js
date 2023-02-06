const validator = require("../util/studentValidator");
module.exports = (req, res, nxt) => {
  const valid = validator(req.body);
  if (!valid) return res.status(403).send("forbidden command");
  req.valid = 1;
  nxt();
};
