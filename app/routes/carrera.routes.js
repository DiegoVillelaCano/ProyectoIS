module.exports = app => {
    const carreras = require("../controllers/carrera.controllers.js");

    //create a career
    app.post("/carreras", carreras.create);
    //show all careers
    app.get("/carreras", carreras.findAll);
    //show career by an specific id
    app.get("/carreras/:carreraId", carreras.findOne);
    //update a career by an specific id
    app.put("/carreras/:carreraId", carreras.update);
    //delete a career by an specific id
    app.delete("/carreras/:carreraId", carreras.delete);
};  