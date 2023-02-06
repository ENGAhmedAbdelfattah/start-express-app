const router = require("express").Router();
const { join } = require("path");
const studentController = require(join(
  __dirname,
  "../controllers/student_C_db"
));
const studentValidator_MW = require(join(
  __dirname,
  "../middleware/studentValidator_MW.js"
));
const authorization_MW = require(join(
  __dirname,
  "../middleware/authorization_MW.js"
));
// _________________________________________________________________________________
/*Data*/
// move to 📁controller then move to 📁models then move to 📁Data
// _________________________________________________________________________________
/* CURD operators Routers*/
// get all student ex http://localhost:5000/api/students/all
router.get("/all", studentController.getAllStudents);
// get student by one param id ex http://localhost:5000/api/students/2
router.get("/std/:id", studentController.getStudentById);
/* POST Router -- create new student ex http://localhost:5000/api/students/add*/
router.post(
  "/add",
  studentValidator_MW,
  authorization_MW,
  studentController.createNewStudent
);
/* PUT Router -- update student*/
router.put(
  "/update/:id",
  studentValidator_MW,
  authorization_MW,
  studentController.updateStudentById
);
/* DELETE Router -- remove student*/
router.delete(
  "/delete/:id",
  authorization_MW,
  studentController.deleteStudentById
);
// _________________________________________________________________________________

module.exports = router;
