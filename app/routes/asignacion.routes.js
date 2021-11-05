module.exports = app => {
    const asignacion = require("../controllers/asignacion.controller.js")
  
    //Crear nueva asignacion
    app.post("/asignacion", asignacion.create);
  
    // Devolver todas las asignacion
    app.get("/asignacion", asignacion.findAll);

    // Devuelve una asignacion por el codigo
    app.get("/asignacion/:asignacionId", asignacion.findOne);

    // Actualizar una asignacion por su código
    app.put("/asignacion/:asignacionId", asignacion.update);

    // Borrar una asignacion específica
    app.delete("/asignacion/:asignacionId", asignacion.delete);

    // Borrar todas las asignaciones
    app.delete("/asignacion", asignacion.deleteAll);
  };