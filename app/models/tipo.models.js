const sql = require("./db.js");

// constructor
const Tipo = function(tipo) {
  //this.codigou = tipo.codigou;
  this.nombre = tipo.nombre;
};

Tipo.getAll = (where, result) => {
  sql.query("SELECT * FROM tipoUser" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipo: ", res);
    result(null, res);
  });
};

Tipo.create = (newTipo, result) => {
  sql.query("INSERT INTO tipoUser SET ?", newTipo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Tipo creado: ", { id: res.insertId, ...newTipo });
    result(null, { id: res.insertId, ...newTipo });
  });
};

Tipo.findById = (tipoId, result) => {
  sql.query(`SELECT * FROM tipoUser WHERE idtipo = ${tipoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("tipo encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // tipo no encontrado con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Tipo.updateById = (tipoId, tipo, result) => {
  sql.query(
    "UPDATE tipoUser SET   codigou = ?, nombre = ?WHERE idtipo = ?",
    [tipo.codigou, tipo.nombre, tipoId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // tipo no encontrado con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("tipo actualizado: ", { tipoId: tipoId, ...tipo });
      result(null, { tipoId: tipoId, ...tipo });
    }
  );
};

Tipo.remove = (tipoId, result) => {
  sql.query("DELETE FROM tipo WHERE idtipo = ?", tipoId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // tipo no encontrado con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("tipo borrado con idtipo: ", tipoId);
    result(null, res);
  });
};

Tipo.removeAll = result => {
  sql.query("DELETE FROM tipo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} tipo`);
    result(null, res);
  });
};

module.exports = Tipo;
