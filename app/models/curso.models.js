const sql = require("./db.js");

// constructor
const Curso = function(curso) {
  this.codigoc = curso.codigoc;
  this.nombre = curso.nombre;
};

Curso.getAll = (where, result) => {
  sql.query("SELECT * FROM curso" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("curso: ", res);
    result(null, res);
  });
};

Curso.create = (newCurso, result) => {
  sql.query("INSERT INTO curso SET ?", newCurso, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Curso creado: ", { id: res.insertId, ...newCurso });
    result(null, { id: res.insertId, ...newCurso });
  });
};

Curso.findById = (cursoId, result) => {
  sql.query(`SELECT * FROM curso WHERE idcurso = ${cursoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("curso encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // curso no encontrado con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Curso.updateById = (cursoId, curso, result) => {
  sql.query(
    "UPDATE curso SET   codigoc = ?, nombre = ?WHERE idcurso = ?",
    [curso.codigoc, curso.nombre, cursoId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // curso no encontrado con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("curso actualizado: ", { cursoId: cursoId, ...curso });
      result(null, { cursoId: cursoId, ...curso });
    }
  );
};

Curso.remove = (cursoId, result) => {
  sql.query("DELETE FROM curso WHERE idcurso = ?", cursoId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // curso no encontrado con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("curso borrado con idcurso: ", cursoId);
    result(null, res);
  });
};

Curso.removeAll = result => {
  sql.query("DELETE FROM curso", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} curso`);
    result(null, res);
  });
};

module.exports = Curso;
