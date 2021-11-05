const Curso = require("../models/curso.models.js");
  
// Crear nuevo curso
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Crear un curso
    const curso = new Curso({        
      codigoc: req.body.codigoc,
      nombre: req.body.nombre
    });
  
    // Grabar Curso
  Curso.create(curso, (err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Error al crear el curso."
      });
      else res.send({
        status: 0,
        message: "Curso grabado exitosamente.",
        curso: data});
});
};  

// Devolver todos los cursos.
exports.findAll = (req, res) => {
  var where = " WHERE 1 = 1 ";
  
  Curso.getAll(where, (err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Error consultando los cursos."
      });
      else res.send({
        status: 0,
        message: "Cursos consulados exitosamente.",
        curso: data});
});
};

// Devuelve un curso específico
exports.findOne = (req, res) => {
  Curso.findById(req.params.cursoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 1,
          message: `Curso no encontrado con el código ${req.params.cursoId}.`
        });
      } else {
        res.status(500).send({
          status: 1,
          message: "Error consultando el curso con código " + req.params.cursoId
        });
      }
    } else res.send({
      status: 0,
      message: "Curso consulado exitosamente.",
      curso: data});
});
};

//Actualiza un curso específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: 1,
      message: "Content can not be empty!"
    });
  }

  Curso.updateById(
    req.params.cursoId,
    new Curso(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Curso no encontrado con el código ${req.params.cursoId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error actualizando curso con el código " + req.params.cursoId
          });
        }
      } else res.send({
        status: 0,
        message: "Curso actualizado exitosamente.",
        curso: data});
    }
  );
};

// Borrar un curso específico
exports.delete = (req, res) => {
  Curso.remove(req.params.cursoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 1,
          message: `curso no encontrado con el código ${req.params.cursoId}.`
        });
      } else {
        res.status(500).send({
          status: 1,
          message: "No se pudo borrar el curso con el código " + req.params.cursoId
        });
      }
    } else res.send({status: 0, message: `Curso eliminado exitosamente!` });
  });
};

// Borrar todos los cursos
exports.deleteAll = (req, res) => {
  Curso.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Ocurrió un error al borrar todos los cursos."
      });
    else res.send({status: 0, message: `Todos los cursos fueron borrados exitosamente!` });
  });
};