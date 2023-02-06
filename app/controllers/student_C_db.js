const Students = require("../models/student_Mo_db");
const asyncFunction = require("./../util/asyncFunction");

// GetA11Students
const getAllStudents = asyncFunction(async (req, res) => {
  const allStudent = await Students.find({})
    .select({ name: 1, dept: 1, id: 1, _id: 0 })
    .sort({ id: 1 });
  if (allStudent) return res.send(allStudent);
  res.status(404).send("Not Found");
});
// GetStudentById
const getStudentById = asyncFunction(async (req, res) => {
  const studentById = await Students.findById(req.params.id);
  console.log(studentById);
  if (studentById) return res.send(studentById);
  res.status(404).send("Student with this id is not found");
});
// CreateStudent (note: validation added with studentValidator_MW in studentRstructure_db router)
const createNewStudent = asyncFunction(async (req, res) => {
  const newid = (await Students.find({})).length + 1;
  const newStudent = new Students({ ...req.body, id: newid });
  newStudent
    .save()
    .then(() => {
      res.send(newStudent);
    })
    .catch((errs) => {
      for (let err in errs.errors) {
        console.log(err.message);
      }
      res.status(400).send("bad request => some field missed!");
    });
});
// UpdateStudent (note: validation added with studentValidator_MW in studentRstructure_db router)
const updateStudentById = asyncFunction(async (req, res) => {
  const studentById = await Students.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  console.log(studentById);
  if (!studentById)
    return re.status(404).send("Student with this id is not found");
  res.send(studentById);
});
// DeleteStudent
const deleteStudentById = asyncFunction(async (req, res) => {
  const studentById = await Students.findByIdAndDelete(req.params.id);
  if (!studentById)
    return re.status(404).send("Student with this id is not found");
  res.send(studentById);
});

module.exports = {
  getAllStudents,
  getStudentById,
  createNewStudent,
  updateStudentById,
  deleteStudentById,
};
