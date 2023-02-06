const { join } = require("path");
const router = require("express").Router();
const authValidator = require(join(
  __dirname,
  "../middleware/authValidator_MW"
));
const authController = require(join(__dirname, "../controllers/auth_C_db"));

// Login ()

router.post("/", authValidator, authController);

module.exports = router;
