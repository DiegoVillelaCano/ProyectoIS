const Tareas = require("../models/tareas.models.js");
  
// Crear nuevas tareas
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Crear una tarea
    const tareas = new Tareas({        
      idtarea: req.body.idtarea,
      punteo: req.body.punteo,
      descripcion: req.body.descripcion,
      codigou: req.body.codigou,
      Entrega: req.body.Entrega
    });
  
    // Grabar tareas
    Tareas.create(tareas, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error al crear las tareas."
        });
        else res.send({
          status: 0,
          message: "Tareas grabadas exitosamente.",
         tareas: data});
  });
  };  

// Devolver todos los tareas.
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Tareas.getAll(where, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error consultando las tareas."
        });
        else res.send({
          status: 0,
          message: "Tareas consulados exitosamente.",
          tareas: data});
  });
  };

  // Devuelve una tarea específica
  exports.findOne = (req, res) => {
    Tareas.findById(req.params.tareasId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Tareas no encontradas con el código ${req.params.tareasId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error consultando el tareas con código " + req.params.tareasId
          });
        }
      } else res.send({
        status: 0,
        message: "Tareas consuladas exitosamente.",
        tareas: data});
  });
  };

  //Actualiza un tarea específica
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: 1,
        message: "Content can not be empty!"
      });
    }
  
    Tareas.updateById(
      req.params.tareasId,
      new Tareas(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 1,
              message: `Tareas no encontradas con el código ${req.params.tareasId}.`
            });
          } else {
            res.status(500).send({
              status: 1,
              message: "Error actualizando tareas con el código " + req.params.tareasoId
            });
          }
        } else res.send({
          status: 0,
          message: "Tarea actualizada exitosamente.",
          tareas: data});
      }
    );
  };

  // Borrar una tarea específica
  exports.delete = (req, res) => {
    Tareas.remove(req.params.tareasId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Tarea no encontrada con el código ${req.params.tareasId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "No se pudo borrar la tarea con el código " + req.params.tareasId
          });
        }
      } else res.send({status: 0, message: `Tareas eliminada exitosamente!` });
    });
  };

  // Borrar todas las tareas
  exports.deleteAll = (req, res) => {
    Tareas.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Ocurrió un error al borrar todas las tareas."
        });
      else res.send({status: 0, message: `Todos las tareas fueron borradas exitosamente!` });
    });
  };