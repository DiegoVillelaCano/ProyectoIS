const sql = require("./db.js");

// constructor
const Tareas = function(tareas) {
  this.codigou = tareas.codigou;
  this.Entrega = tareas.Entrega;
  this.descripcion = tareas.descripcion;
  this.idtarea = tareas.idtarea;
  this.punteo = tareas.punteo;
};

Tareas.getAll = (where, result) => {
  sql.query("SELECT * FROM tareas" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tareas: ", res);
    result(null, res);
  });
};

Tareas.create = (newTareas, result) => {
  sql.query("INSERT INTO tareas SET ?", newTareas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Tareas creado: ", { id: res.insertId, ...newTareas});
    result(null, { id: res.insertId, ...newTareas });
  });
};

Tareas.findById = (tareasId, result) => {
  sql.query(`SELECT * FROM tareas WHERE idtareas = ${tareasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("tareas encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // tareas no encontradas con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Tareas.updateById = (tareasId, tareas, result) => {
  sql.query(
    "UPDATE tareas SET   idtarea = ?, punteo = ?, descripcion = ?, Entrega = ?, codigou =? WHERE idtareas = ?",
    [tareas.idtarea, tareas.punteo, tareas.descripcion, tareas.Entrega, tareas.codigou, tareasId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // tareas no encontradas con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("tareas actualizado: ", { tareasId: tareasId, ...tareas });
      result(null, { tareasId: tareasId, ...tareas });
    }
  );
};

Tareas.remove = (tareasId, result) => {
  sql.query("DELETE FROM tareas WHERE idtareas = ?", tareasId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // tareas no encontrado con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("tareas borrado con idtareas: ", tareasId);
    result(null, res);
  });
};

Tareas.removeAll = result => {
  sql.query("DELETE FROM tareas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} tareas`);
    result(null, res);
  });
};

module.exports = Tareas;
