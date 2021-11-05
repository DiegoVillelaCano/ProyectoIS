module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js")
  
    //Crear nuevo usuario
    app.post("/usuarios", usuarios.create);
  
    // Devolver todos los usuarios
    app.get("/usuarios", usuarios.findAll);

    // Devuelve un usuario por el codigo
    app.get("/usuarios/:userId", usuarios.findOne);

    // Actualizar un usuario por su código
    app.put("/usuarios/:userId", usuarios.update);

    // Borrar un usuario específico
    app.delete("/usuarios/:userId", usuarios.delete);

    // Borrar todos los usuarios
    app.delete("/usuarios", usuarios.deleteAll);
  };