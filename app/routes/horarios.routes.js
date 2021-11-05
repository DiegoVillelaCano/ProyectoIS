module.exports = app => {
    const horarios = require("../controllers/horarios.controller.js")
  
    //Crear nuevo horario
    app.post("/horarios", horarios.create);
  
    // Devolver todos los horarios
    app.get("/horarios", horarios.findAll);

    // Devuelve un horario por el codigo
    app.get("/horarios/:horarioId", horarios.findOne);

    // Actualizar un horario por su código
    app.put("/horarios/:horarioId", horarios.update);

    // Borrar un horario específico
    app.delete("/horarios/:horarioId", horarios.delete);

    // Borrar todos los horarios
    app.delete("/horarios", horarios.deleteAll);
  };