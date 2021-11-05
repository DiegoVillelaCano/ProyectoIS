module.exports = app => {
    const curso = require("../controllers/curso.controller.js")
  
    //Crear nuevo curso
    app.post("/curso", curso.create);
  
    // Devolver todos los cursos
    app.get("/curso", curso.findAll);

    // Devuelve un curso por el codigo
    app.get("/curso/:cursoId", curso.findOne);

    // Actualizar un curso por su código
    app.put("/curso/:cursoId", curso.update);

    // Borrar un curso específico
    app.delete("/curso/:cursoId", curso.delete);

    // Borrar todos los cursos
    app.delete("/curso", curso.deleteAll);
  };