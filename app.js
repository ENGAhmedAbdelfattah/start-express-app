const app = require("./config/server");
const port = process.env.PORT || 5000;

//-- require files
// custom MW for all
// ----
//*Router
const studentRouter = require("./app/routes/studentRstructure_db");
const usersRouter = require("./app/routes/users");
const authRouter = require("./app/routes/auth");
const adminRouter = require("./app/routes/admin");
//*MW
const error_MW = require("./app/middleware/error_MW");
// ____________________________________________________________________________________
/* Express Routers */
app.use("/api/students", studentRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", authRouter);
app.use("/api/admin", adminRouter);

// ____________________________________________________________________________________
/* Error Handle MW*/
// error MW
app.use(error_MW);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

// if(!process.env.PORT) {
//   console.log("PORT isn't set!")
//   process.exit(1);
// };

// express structure folder is:
/* [app.js => server.js => 📁router => 📁controller => 📁models => ("📁Data folder with 💾Json file" or "🛢️Database ex mongoDB")] */
