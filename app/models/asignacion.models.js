const sql = require("./db.js");

// constructor
const Asignacion = function(Asignacion) {
  this.codigoc = asignacion.codigoc;
  this.codigoa = asignacion.codigoa;
  this.codigou = asignacion.codigou;
};

Asignacion.getAll = (where, result) => {
  sql.query("SELECT * FROM asignacion" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("asignacion: ", res);
    result(null, res);
  });
};

Asignacion.create = (newAsignacion, result) => {
  sql.query("INSERT INTO asignacion SET ?", newAsignacion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Asignacion creado: ", { id: res.insertId, ...newAsignacion });
    result(null, { id: res.insertId, ...newAsignacion });
  });
};

Asignacion.findById = (asignacionId, result) => {
  sql.query(`SELECT * FROM asignacion WHERE idasignacion = ${asignacionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("asignacion encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // asignacion no encontrada con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Asignacion.updateById = (asignacionId, asignacion, result) => {
  sql.query(
    "UPDATE asignacion SET   codigoc = ?, codigoa= ?, codigou= ? WHERE idasignacion = ?",
    [asignacion.codigoc, asignacion.codigoa, asignacion.codigou, asignacionId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // asignacion no encontrada con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("asignacion actualizado: ", { asignacionId: asignacionId, ...asignacion });
      result(null, { asignacionId: asignacionId, ...asignacion });
    }
  );
};

Asignacion.remove = (asignacionId, result) => {
  sql.query("DELETE FROM asignacion WHERE idasignacion = ?", asignacionId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // asignacion no encontrada con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("asignacion borrado con idasignacion: ", asignacionId);
    result(null, res);
  });
};

Asignacion.removeAll = result => {
  sql.query("DELETE FROM asignacion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} asignacion`);
    result(null, res);
  });
};

module.exports = Asignacion;