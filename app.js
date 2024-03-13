const express = require("express");
//const { ObjectId } = require("mongodb");
//crear cliente mongo
//const MongoClient = require("mongodb").MongoClient;
const employeesRoutes = require('./routes/employeesRoutes')
const app = express();
const port = 3000;

// agregar para enviar cadenas json al enviar (post)
app.use(express.json());
app.use('/', employeesRoutes)

//const CONNECTION_STRING =
  //"mongodb+srv://berth:19031032@cluster0.0kbj8ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// variable global
//var db = null;

// app.get("/employees", async (req, res) => {
//   const employees = await db.collection("employees").find().toArray();

//   // employees.forEach(element => {
//   //     console.log(element)
//   // });

//   res.send(employees);
// });

// // Buscar por número de empleado
// app.get("/employees/:emp_no", async (req, res) => {
//   const employees = await db
//     .collection("employees")
//     .find({ emp_no: parseInt(req.params.emp_no) })
//     .toArray();
//   res.send(employees);
// });

// // Buscar por oid de empleado
// app.get("/employees/oid/:oid", async (req, res) => {
//   const employees = await db
//     .collection("employees")
//     .find({ _id: new ObjectId(req.params.oid) })
//     .toArray();
//   res.send(employees);
// });

// // Buscar por genero y departamento
// app.get(
//   "/employees/department/:department/gender/:gender",
//   async (req, res) => {
//     const department = req.params.department;
//     const gender = req.params.gender;

//     const employees = await db
//       .collection("employees")
//       .find({ department: department, gender: gender })
//       .toArray();
//     res.send(employees);
//   }
// );

// // Insertar un empleado nuevo
// app.post("/employees", async function (req, res) {
//   function getRandomArbitrary(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
//   }

//   const newEmployee = {
//     "emp_no": getRandomArbitrary(1500, 10000),
//     "name": req.body.name,
//     "email": req.body.email,
//     "gender": req.body.gender,
//     "salary": req.body.salary,
//     "hire_date": req.body.hire_date,
//     "department": req.body.department,
//   };
//   const result = await db.collection("employees").insertOne(newEmployee);
//   res.send(result);
// });

// // Actualizar un empleado existente
// app.put("/employees/:emp_no", async function (req, res) {
//   try {
//     const empNoToUpdate = parseInt(req.params.emp_no);

//     const updatedEmployee = {
//       "name": req.body.name,
//       "email": req.body.email,
//       "gender": req.body.gender,
//       "salary": req.body.salary,
//       "hire_date": req.body.hire_date,
//       "department": req.body.department,
//     };

//     const result = await db.collection("employees").findOneAndUpdate(
//       { "emp_no": empNoToUpdate },
//       { $set: updatedEmployee },
//       { returnDocument: "after" } //Devolver el documento actualzado
//     );

//     if (result.value) {
//       res.send(result.value);
//   } else {
//       res.status(404).send("Empleado no encontrado");
//   }
//   } catch (error) {
//     console.error("Error al actualizar el empleado: ", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });

// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
  // const client = new MongoClient(CONNECTION_STRING);

  // try {
  //   await client.connect();
  //   db = client.db("employeesDB");
  //   console.log("MongoDB Connection Success...");
  // } catch (error) {
  //   console.log(error);
  // }
});

//consultar empleados por su genero y departamento
