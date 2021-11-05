const Video = require("../models/videos.models.js");

// Devolver todas las videoconferencias.
exports.findAll = (req, res) => {
  if (Object.keys(req.params).length == 0) {
    res.status(400).send({
      status: 1,
      message: "Se requiere código de curso!"
    });
  } else {
    var token = req.header('token');
    
    Video.getAll(req.params.cursoId, token, (err, data) => {
      if (err)
        res.status(500).send({
          status: 1,
          message:
            err.message || "Error consultando videoconferencias."
        });
      else {
          if (data == "Token inválido."){
            res.send({
              status: 1,
              message: "Error consultando videoconferencias. " + data});    
          } else {
            res.send({
              status: 0,
              message: "Videoconferencias consultadas exitosamente.",
              videoconferencias: data});    
        }
      } 
    });
  }
};

// Devolver todas las videoconferencias grabadas.
exports.findGrabadas = (req, res) => {
    if (Object.keys(req.params).length == 0) {
      res.status(400).send({
        status: 1,
        message: "Se requiere código de curso!"
      });
    } else {
      var token = req.header('token');
    
      Video.getGrabadas(req.params.cursoId, token, (err, data) => {
        if (err)
          res.status(500).send({
            status: 1,
            message:
              err.message || "Error consultando videoconferencias grabadas."
          });
          else {
            if (data == "Token inválido."){
              res.send({
                status: 1,
                message: "Error consultando videoconferencias. " + data});    
            } else {
              res.send({
                status: 0,
                message: "Videoconferencias grabadas consultadas exitosamente.",
                videoconferencias: data});    
          }
        } 
      });  
    }
  };
