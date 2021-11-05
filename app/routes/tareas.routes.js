module.exports = app => {
    const tareas = require("../controllers/tareas.controller.js")
  
    //Crear nuevas tareas
    app.post("/tareas", tareas.create);
  
    // Devolver todas las tareas
    app.get("/tareas", tareas.findAll);

    // Devuelve una tarea  por el codigo
    app.get("/tareas/:tareasId", tareas.findOne);

    // Actualizar una tarea por su código
    app.put("/tareas/:tareasId", tareas.update);

    // Borrar una tarea específica
    app.delete("/tareas/:tareasId", tareas.delete);

    // Borrar todos las tareas 
    app.delete("/tareas", tareas.deleteAll);
  };