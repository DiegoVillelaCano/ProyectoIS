module.exports = app => {
    const tipo = require("../controllers/tipo.controller.js")
  
    //Crear nuevo tipo
    app.post("/tipo", tipo.create);
  
    // Devolver todos los tipos
    app.get("/tipo", tipo.findAll);

    // Devuelve un tipo por el codigo
    app.get("/tipo/:tipoId", tipo.findOne);

    // Actualizar un tipo por su código
    app.put("/tipo/:tipoId", tipo.update);

    // Borrar un tipo específico
    app.delete("/tipo/:tipoId", tipo.delete);

    // Borrar todos los tipos
    app.delete("/tipo", tipo.deleteAll);
  };