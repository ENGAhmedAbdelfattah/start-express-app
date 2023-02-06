const { join } = require("path");
const router = require("express").Router();
const authorization_MW = require(join(
  __dirname,
  "../middleware/authorization_MW.js"
));
const adminController = require(join(__dirname, "../controllers/admin_C_db"));
// update user role
router.put("/:id", authorization_MW, adminController);

module.exports = router;
// , adminValidator
