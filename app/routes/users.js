const { join } = require("path");
const router = require("express").Router();
const userValidator = require(join(__dirname, "../middleware/usersValidator_MW"));
const userController = require(join(__dirname, "../controllers/users_C_db"));

// Registration

router.post("/", userValidator, userController);

module.exports = router;
