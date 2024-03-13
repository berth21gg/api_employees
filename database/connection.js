const MongoClient = require("mongodb").MongoClient;

const CONNECTION_STRING =
  "mongodb+srv://berth:19031032@cluster0.0kbj8ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// variable global
var db = null;

const client = new MongoClient(CONNECTION_STRING);

try {
  client.connect();
  db = client.db("employeesDB");
  console.log("MongoDB Connection Success...");
} catch (error) {
  console.log(error);
}

module.exports = db
