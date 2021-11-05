const sql = require("./db.js");

//constructor
const Carrera = function(carrera) {
    this.carrera = carrera.carrera;
};

//create a career
Carrera.create = (newCarrera, result) => {
    sql.query("INSERT INTO carrera SET ?", newCarrera, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Carrera ingresada: ", { id: res.insertId, ...newCarrera });
        result(null, {id: res.insertId, ...newCarrera });
    });
};

//show all careers
Carrera.getAll = (where,result) => {
    sql.query("SELECT * FROM carrera" + where, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Carreras: ", res);
      result(null, res);
    });
};

//show careers by an specific id
Carrera.findById = (carreraId, result) => {
    sql.query(`SELECT * FROM carrera WHERE idc = ${carreraId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("carrera encontrada: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      //Carrera no encontrada con el código enviado
      result({ kind: "not_found" }, null);
    });
};

//update a specific career
Carrera.updateById = (carreraId, carrera, result) => {
    sql.query(
      "UPDATE carrera SET carrera = ? WHERE idc = ?",
      [carrera.carrera, carreraId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          //career not found by the code sent
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("carrera actualizada: ", { carreraId: carreraId, ...carrera });
        result(null, { carreraId: carreraId, ...carrera });
      }
    );
};

//delete a specific career
Carrera.remove = (carreraId, result) => {
    sql.query("DELETE FROM carrera WHERE idc = ?", carreraId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        //carrera not found by the code sent
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("carrera borrada con idc: ", carreraId);
      result(null, res);
    });
};

//no se puede eliminar las carreras ya que llave fóranea de otra tabla

module.exports = Carrera;