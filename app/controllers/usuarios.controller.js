const Usuario = require("../models/usuarios.models.js");
  
// Crear nuevo usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: 0,
        message: "Content can not be empty!"
      });
    }
  
    // Crear un usuario
    const usuario = new Usuario({
      carnet: req.body.carnet,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      user: req.body.user,
      idc: req.body.idc,
      codigot: req.body.codigot,
      password: req.body.password,
      email: req.body.email
    });
  
    // Grabar Usuario
    Usuario.create(usuario, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error creando el usuario."
        });
      else res.send({
            status: 0,
            message: "Usuario grabado exitosamente.",
            usuario: data});
    });
  };  

// Devolver todos los usuarios.
exports.findAll = (req, res) => {
    var where = " WHERE 1 = 1 ";
    
    Usuario.getAll(where, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error consultando usuarios."
        });
      else res.send({
            status: 0,
            message: "Usuarios consulados exitosamente.",
            usuarios: data});
    });
  };

  // Devuelve un usuario específico
  exports.findOne = (req, res) => {
    Usuario.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Usuario no encontrado con el código ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "Error consultando el usuario con código " + req.params.userId
          });
        }
      } else res.send({
          status: 0,
          message: "Usuario consulado exitosamente.",
          usuario: data});
    });
  };

  //Actualiza un usuario específico
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: 1,
        message: "Content can not be empty!"
      });
    }
  
    Usuario.updateById(
      req.params.userId,
      new Usuario(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 1,
              message: `Usuario no encontrado con el código ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              status: 1,
              message: "Error actualizando usuario con el código " + req.params.userId
            });
          }
        } else res.send({
          status: 0,
          message: "Usuario actualizado exitosamente.",
          usuario: data});
      }
    );
  };

  // Borrar un usuario específico
  exports.delete = (req, res) => {
    Usuario.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 1,
            message: `Usuario no encontrado con el código ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            status: 1,
            message: "No se pudo borrar el usuario con el código " + req.params.userId
          });
        }
      } else res.send({status: 0, message: `Usuario eliminado exitosamente!` });
    });
  };

  // Borrar todos los usuarios
  exports.deleteAll = (req, res) => {
    Usuarios.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Ocurrió un error al borrar todos los usuarios."
        });
      else res.send({status: 0, message: `Todos los usuarios fueron borrados exitosamente!` });
    });
  };

