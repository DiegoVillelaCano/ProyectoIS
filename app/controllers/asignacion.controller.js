const Asignacion = require("../models/asignacion.models.js");
  
// Crear nueva asignacion
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Crear una asignacion
    const asignacion = new Asignacion({        
      codigou: req.body.codigou,
      codigoa: req.body.codigoa,
      codigoc: req.body.codigoc
    });
  
   // Grabar asignacion
   Asignacion.create(asignacion, (err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Error al crear la asignacion."
      });
      else res.send({
        status: 0,
        message: "Asignacion exitosamente.",
       asignacion: data});
});
};  

// Devolver todas las asignaciones.
exports.findAll = (req, res) => {
  var where = " WHERE 1 = 1 ";
  
  Asignacion.getAll(where, (err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Error consultando las asignaciones."
      });
      else res.send({
        status: 0,
        message: "Asignacion consulada exitosamente.",
        asignacion: data});
});
};

// Devuelve una asignacion especifica 
exports.findOne = (req, res) => {
  Asignacion.findById(req.params.asignacionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 1,
          message: `Asignacion no encontrada con el código ${req.params.asignacionId}.`
        });
      } else {
        res.status(500).send({
          status: 1,
          message: "Error consultando la asignacion con código " + req.params.asignacionId
        });
      }
    } else res.send({
      status: 0,
      message: "Asignacion consulada exitosamente.",
      asignacion: data});
});
};

//Actualiza una asignacion específica
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: 1,
      message: "Content can not be empty!"
    });
  }

  Asignacion.updateById(
    req.params.asignacionId,
    new Asignacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Asignacion no encontrada con el código ${req.params.asignacionId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error de actualizacion de asignatura  con el código " + req.params.asignacionId
          });
        }
      } else res.send({
        status: 0,
        message: "asignacion actualizado exitosamente.",
        asignacion: data});
    }
  );
};

// Borrar una asignacion en específico
exports.delete = (req, res) => {
  Asignacion.remove(req.params.asignacionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 1,
          message: `Asignacion no encontrada con el código ${req.params.asignacionId}.`
        });
      } else {
        res.status(500).send({
          status: 1,
          message: "No se pudo borrar la asignacion con el código " + req.params.asignacionId
        });
      }
    } else res.send({status: 0, message: `Asignacion eliminada exitosamente!` });
  });
};

// Borrar todos las asignaciones
exports.deleteAll = (req, res) => {
  Asignacion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: 1,
        message:
          err.message || "Ocurrió un error al borrar todos las asignaciones."
      });
    else res.send({status: 0, message: `Todos las asignaciones fueron borrados exitosamente!` });
  });
};