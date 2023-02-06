const Users = require("../models/users_Mo_db");
const asyncFunction = require("./../util/asyncFunction");
// const updateAdminById = (req, res) => {
//   Users.findByIdAndUpdate(
//     req.params.id,
//     { role: req.body.role },
//     { returnDocument: "after" },
//     (err, data) => {
//       if (!err) {
//         if (data) {
//           res.send("User Role is set to Admin");
//         } else {
//           res.status(400).send("User Not Found");
//         }
//       } else {
//         res.status(500).send("Server Error..!");
//       }
//     }
//   );
// };

// or
const updateAdminById = asyncFunction(async (req, res) => {
  const existUser = await Users.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { returnDocument: "after" }
  );
  if (!existUser) return res.status(400).send("User Not Found");
  res.send("User Role is set to Admin");
});
module.exports = updateAdminById;
