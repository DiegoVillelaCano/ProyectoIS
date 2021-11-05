const sql = require("./db.js");

//constructor
const Material = function(material) {
    this.nombre = material.nombre;
    this.descripcion = material.descripcion;
    this.codigoc = material.codigoc;
};

//create a teaching material
Material.create = (newMaterial, result) => {
    sql.query("INSERT INTO material SET ?", newMaterial, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("material ingresado: ", { id: res.insertId, ...newMaterial });
        result(null, {id: res.insertId, ...newMaterial });
    });
};

//show all teaching material
Material.getAll = (where,result) => {
    sql.query("SELECT * FROM material" + where, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("material didáctico: ", res);
      result(null, res);
    });
};

//show teaching material by an specific id
Material.findById = (materialId, result) => {
    sql.query(`SELECT * FROM material WHERE idmaterial = ${materialId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("material encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // material no encontrado con el código enviado
      result({ kind: "not_found" }, null);
    });
};

//update a specific teaching material
Material.updateById = (materialId, material, result) => {
    sql.query(
      "UPDATE material SET nombre = ?, descripcion = ?, codigoc = ? WHERE idmaterial = ?",
      [material.nombre, material.descripcion, material.codigoc, materialId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          //material not found by the code sent
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("material actualizado: ", { materialId: materialId, ...material });
        result(null, { materialId: materialId, ...material });
      }
    );
};

//delete a specific teaching material
Material.remove = (materialId, result) => {
    sql.query("DELETE FROM material WHERE idmaterial = ?", materialId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        //material not found by the code sent
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("material borrado con idmaterial: ", materialId);
      result(null, res);
    });
};

//delete all teaching material
Material.removeAll = result => {
    sql.query("DELETE FROM material", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`borrados ${res.affectedRows} material`);
      result(null, res);
    });
};



module.exports = Material;