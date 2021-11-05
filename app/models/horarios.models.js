const sql = require("./db.js");

// constructor
const Horario = function(horario) {
  this.descripcion = horario.descripcion;
  this.hinicio = horario.hinicio;
  this.hfinal = horario.hfinal;
  this.dia = horario.dia;
  this.codigou = horario.codigou;
};

Horario.getAll = (where, result) => {
  sql.query("SELECT * FROM horario" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("horario: ", res);
    result(null, res);
  });
};

Horario.create = (newHorario, result) => {
  sql.query("INSERT INTO horario SET ?", newHorario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("horario creado: ", { id: res.insertId, ...newHorario });
    result(null, { id: res.insertId, ...newHorario });
  });
};

Horario.findById = (horarioId, result) => {
  sql.query(`SELECT * FROM horario WHERE idhorario = ${horarioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("horario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // horario no encontrado con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Horario.updateById = (horarioId, horario, result) => {
  sql.query(
    "UPDATE horario SET descripcion = ?, hinicio = ?, hfinal = ?, dia = ?, codigou = ? WHERE idhorario = ?",
    [horario.descripcion, horario.hinicio, horario.hfinal, horario.dia, horario.codigou, horarioId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // horario no encontrado con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("horario actualizado: ", { horarioId: horarioId, ...horario });
      result(null, { horarioId: horarioId, ...horario });
    }
  );
};

Horario.remove = (horarioId, result) => {
  sql.query("DELETE FROM horario WHERE idhorario = ?", horarioId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // horario no encontrado con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("horario borrado con idhorario: ", horarioId);
    result(null, res);
  });
};

Horario.removeAll = result => {
  sql.query("DELETE FROM horario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} horario`);
    result(null, res);
  });
};

module.exports = Horario;
