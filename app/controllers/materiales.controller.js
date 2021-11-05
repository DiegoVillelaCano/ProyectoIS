const Material = require("../models/materiales.models.js");
  
//create a teaching material
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status:1,
        message: "Content can not be empty!"
      });
    }
  
    //create a teaching material
    const material = new Material ({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigoc: req.body.codigoc
    });
  
    //save a teaching material
    Material.create(material, (err, data) => {
      if(err) {
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error al crear carrera."
        });
      } else res.send({
        status: 0,
          message: "Material grabado exitosamente.",
          material: data});
    });
}; 

//show all teaching material
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Material.getAll(where, (err, data) => {
      if (err)
        res.json({status: 1, message: "Error"});
      else res.send({
        status: 0,
        message: "Consulta de materiales con éxito",
        material: data});
    });
};

//show teaching material by an specific id
exports.findOne = (req, res) => {
    Material.findById(req.params.materialId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `material no encontrado con el código ${req.params.materialId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error consultando el material con código " + req.params.materialId
          });
        }
      } else res.send({
        status: 0,
        message: "Consulta de materiales con éxito",
        material: data});
    });
};

//update an soecific teaching material
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: 1,
        message: "Content can not be empty!"
      });
    }
  
    Material.updateById(
      req.params.materialId,
      new Material(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 1,
              message: `material no encontrado con el código ${req.params.materialId}.`
            });
          } else {
            res.status(500).send({
              status: 1,
              message: "Error actualizando material con el código " + req.params.materialId
            });
          }
        } else res.send({
          status: 0,
          message: "Material actualizado correctamente",
          material: data});
      }
    );
};

//delete an specific teaching material
exports.delete = (req, res) => {
    Material.remove(req.params.materialId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `material no encontrado con el código ${req.params.materialId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "No se pudo borrar el material con el código " + req.params.materialId
          });
        }
      } else res.send({status: 0, message: `material eliminado exitosamente!` });
    });
  };

//delete all teaching material
exports.deleteAll = (req, res) => {
    Material.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Ocurrió un error al borrar todos los materiales."
        });
      else res.send({status: 0, message: `Todos los materiales fueron borrados exitosamente!` });
    });
};
