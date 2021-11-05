const Horario = require("../models/horarios.models.js");
  
// Crear nuevo horario
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: 1,
        message: "Content can not be empty!"
      });
    }
  
    // Crear un horario
    const horario = new Horario({        
      descripcion: req.body.descripcion,
      hinicio: req.body.hinicio,
      hfinal: req.body.hfinal,
      dia: req.body.dia,
      codigou: req.body.codigou
    });
  
    // Grabar Horario
    Horario.create(horario, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error al crear el horario."
        });
        else res.send({
          status: 0,
          message: "Horario grabado exitosamente.",
          usuario: data});
  });
  };  

// Devolver todos los horarios.
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Horario.getAll(where, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error consultando los horarios."
        });
        else res.send({
          status: 0,
          message: "Horarios consulados exitosamente.",
          horarios: data});
  });
  };

  // Devuelve un horario específico
  exports.findOne = (req, res) => {
    Horario.findById(req.params.horarioId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Horario no encontrado con el código ${req.params.horarioId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error consultando el horario con código " + req.params.horarioId
          });
        }
      } else res.send({
        status: 0,
        message: "Horario consulado exitosamente.",
        horario: data});
  });
  };

  //Actualiza un horario específico
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: 1,
        message: "Content can not be empty!"
      });
    }
  
    Horario.updateById(
      req.params.horarioId,
      new Horario(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 1,
              message: `Horario no encontrado con el código ${req.params.horarioId}.`
            });
          } else {
            res.status(500).send({
              status: 1,
              message: "Error actualizando horario con el código " + req.params.horarioId
            });
          }
        } else res.send({
          status: 0,
          message: "Horario actualizado exitosamente.",
          horario: data});
      }
    );
  };

  // Borrar un horario específico
  exports.delete = (req, res) => {
    Horario.remove(req.params.horarioId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Horario no encontrado con el código ${req.params.horarioId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "No se pudo borrar el horario con el código " + req.params.horarioId
          });
        }
      } else res.send({status: 0, message: `Horario eliminado exitosamente!` });
    });
  };

  // Borrar todos los horarios
  exports.deleteAll = (req, res) => {
    Horarios.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Ocurrió un error al borrar todos los horarios."
        });
      else res.send({status: 0, message: `Todos los horarios fueron borrados exitosamente!` });
    });
  };

