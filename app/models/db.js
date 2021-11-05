const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Abrir conexión a la base de datos
connection.connect(error => {
  if (error) throw error;
  console.log("Conexión exitosa.");
});

module.exports = connection;