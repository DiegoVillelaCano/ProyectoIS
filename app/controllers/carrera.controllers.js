const Carrera = require("../models/carrera.models.js");
  
//create a teaching career
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status:1,
        message: "Content can not be empty!"
      });
    }
  
    //create a teaching career
    const carreras = new Carrera ({
        carrera: req.body.carrera,
    });
  
    //save a career
    Carrera.create(carreras, (err, data) => {
      if (err)
        res.status(500).send({
          status: 0,
          message:
            err.message || "Error al crear carrera."
        });
        else res.send({
          status: 1,
          message: "Carrera grabada exitosamente.",
          usuario: data});
      });
}; 


//show all careers
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Carrera.getAll(where, (err, data) => {
      if(err) {
        res.json({status: 1, message: "Error"});
      } else {
        res.json({status: 0, message: "Carrera obtenida", carreras: data
      });
      }
    });
};

//show career by an specific id
exports.findOne = (req, res) => {
    Carrera.findById(req.params.carreraId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `carrera no encontrada con el código ${req.params.carreraId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error consultando la carrera con código " + req.params.carreraId
          });
        }
      } else res.send({
        status: 0,
        message: "Consulta de carrera con éxito",
        carreras: data});
    });
};

//update an career by specific id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status:1,
        message: "Content can not be empty!"
      });
    }
  
    Carrera.updateById(
      req.params.carreraId,
      new Carrera(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status:1,
              message: `carrera no encontrada con el código ${req.params.carreraId}.`
            });
          } else {
            res.status(500).send({
              status:1,
              message: "Error actualizando carrera con el código " + req.params.carreraId
            });
          }
        } else res.send({
          status: 0,
          message: "Carrera actualizada correctamente",
          carreras: data});
      }
    );
};

//delete an specific career
exports.delete = (req, res) => {
    Carrera.remove(req.params.carreraId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `carrera no encontrada con el código ${req.params.carreraId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "No se pudo borrar la carrera con el código " + req.params.carreraId
          });
        }
      } else res.send({status:0, message: `carrera eliminada exitosamente!` });
    });
  };

//no se puede eliminar las carreras ya que llave fóranea de otra tabla