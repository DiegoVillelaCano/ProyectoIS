module.exports = app => {
    const video = require("../controllers/videos.controller.js")
   
    // Devolver todas las videoconferencias
    app.get("/videoconferencias", video.findAll);
    app.get("/videoconferencias/:cursoId", video.findAll);

    // Devolver todas las videoconferencias grabadas
    app.get("/videoconfgrabadas", video.findGrabadas);
    app.get("/videoconfgrabadas/:cursoId", video.findGrabadas);

  };