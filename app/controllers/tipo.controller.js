const Tipo = require("../models/tipo.models.js");
  
// Crear nuevo tipo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Crear un tipo
    const tipo = new Tipo({        
      //codigou: req.body.codigou,
      nombre: req.body.nombre
    });
  
    // Grabar Tipo
    Tipo.create(tipo, (err, data) => {
      if (err) {
        res.json({status: 1, message: "Error"});
      } else {
        res.json({status: 0, message: "Carrera insertada"});
      }
    });
  };

// Devolver todos los tipos.
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Tipo.getAll(where, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving schedules."
        });
      else res.send(data);
    });
  };

  // Devuelve un Tipo específico
  exports.findOne = (req, res) => {
    Tipo.findById(req.params.tipoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Tipo no encontrado con el código ${req.params.TipoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error consultando el tipo con el código " + req.params.tipoId
          });
        }
      } else res.send(data);
    });
  };

  //Actualiza un tipo específico
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Tipo.updateById(
      req.params.tipoId,
      new Tipo(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Tipo no encontrado con el código ${req.params.tipoId}.`
            });
          } else {
            res.status(500).send({
              message: "Error actualizando tipo con el código " + req.params.tipoId
            });
          }
        } else res.send(data);
      }
    );
  };

  // Borrar un tipo específico
  exports.delete = (req, res) => {
    Tipo.remove(req.params.tipoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Tipo no encontrado con el código ${req.params.tipoId}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo borrar el tipo con el código " + req.params.tipoId
          });
        }
      } else res.send({ message: `Tipo eliminado exitosamente!` });
    });
  };

  // Borrar todos los tipos
  exports.deleteAll = (req, res) => {
    Tipo.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrió un error al borrar todos los tipos."
        });
      else res.send({ message: `Todos los tipos fueron borrados exitosamente!` });
    });
  };
