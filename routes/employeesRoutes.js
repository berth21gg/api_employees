const express = require('express')
const db = require('../database/connection')
const { ObjectId } = require("mongodb");


const router = express.Router()

router.get("/employees", async (req, res) => {
    const employees = await db.collection("employees").find().toArray();

    // employees.forEach(element => {
    //     console.log(element)
    // });

    res.send(employees);
});

// Buscar por número de empleado
router.get("/employees/:emp_no", async (req, res) => {
    const employees = await db
        .collection("employees")
        .find({ "emp_no": parseInt(req.params.emp_no) })
        .toArray();
    res.send(employees);
});

// Buscar por oid de empleado
router.get('/employees/oid/:oid', async (req, res) => {
    try {
        const employees = await db.collection('employees')
            .find({ "_id": new ObjectId(req.params.oid) })
            .toArray();
        res.send(employees);
    } catch (error) {
        console.log(error)
    }
});

// Buscar por genero y departamento
router.get(
    "/employees/department/:department/gender/:gender",
    async (req, res) => {
        const department = req.params.department;
        const gender = req.params.gender;

        const employees = await db
            .collection("employees")
            .find({ "department": department, "gender": gender })
            .toArray();
        res.send(employees);
    }
);

// Insertar un empleado nuevo
router.post("/employees", async function (req, res) {

    // const newEmployee = {
    //     "emp_no": getRandomArbitrary(1500, 10000),
    //     "name": req.body.name,
    //     "email": req.body.email,
    //     "gender": req.body.gender,
    //     "salary": req.body.salary,
    //     "hire_date": req.body.hire_date,
    //     "department": req.body.department,
    // };

    try {
        const emp = await db.collection('employees')
        const lastEmp = await emp.find().sort({ "emp_no": -1 }).limit(1).toArray()
        const emp_no = lastEmp[0].emp_no + 1
        const newEmployee = {
            "emp_no": emp_no,
            "name": req.body.name,
            "email": req.body.email,
            "gender": req.body.gender,
            "salary": req.body.salary,
            "hire_date": req.body.hire_date,
            "department": req.body.department,
        }
        const result = await db.collection("employees").insertOne(newEmployee)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Actualizar un empleado existente
// app.put("/employees/:emp_no", async function (req, res) {
//     try {
//         const empNoToUpdate = parseInt(req.params.emp_no);

//         const updatedEmployee = {
//             "name": req.body.name,
//             "email": req.body.email,
//             "gender": req.body.gender,
//             "salary": req.body.salary,
//             "hire_date": req.body.hire_date,
//             "department": req.body.department,
//         };

//         const result = await db.collection("employees").findOneAndUpdate(
//             { "emp_no": empNoToUpdate },
//             { $set: updatedEmployee },
//             { returnDocument: "after" } //Devolver el documento actualzado
//         );

//         if (result.value) {
//             res.send(result.value);
//         } else {
//             res.status(404).send("Empleado no encontrado");
//         }
//     } catch (error) {
//         console.error("Error al actualizar el empleado: ", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });

//Actualizar 
router.put('/employees', async function (req, res) {

    try {
        const empUpdate = db.collection('employees')
        const result = await empUpdate.findOneAndUpdate(
            { "emp_no": parseInt(req.body.emp_no) },
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});

// Eliminar
router.delete('/employees/:emp_no', async (req, res) => {
    try {
        const result = await db.collection('employees').findOneAndDelete(
            { "emp_no": parseFloat(req.params.emp_no) }
        )
        res.send((result) ? "Employee deleted..." : "Employee not found")
    } catch (error) {
        console.log(error)
    }
})

// Eliminar por oid
router.delete('/employees/oid/:oid', async (req, res) => {
    try {
        const result = await db.collection('employees').findOneAndDelete(
            { "_id": new ObjectId(req.params.oid) }
        )
        res.send((result) ? "Employee deleted..." : "Employee not found")
    } catch (error) {
        console.log(error)
    }
})

router.get("/", (req, res) => res.send("Hello World!"));

module.exports = router