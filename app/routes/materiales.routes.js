module.exports = app => {
    const materiales = require("../controllers/materiales.controller.js")

    //create a teaching material
    app.post("/materiales", materiales.create);
    //show all teaching material
    app.get("/materiales", materiales.findAll);
    //show teaching material by an specific id
    app.get("/materiales/:materialId", materiales.findOne);
    //update a teaching material by an specific id
    app.put("/materiales/:materialId", materiales.update);
    //delete a teaching material by an specific id
    app.delete("/materiales/:materialId", materiales.delete);
    //delete all teaching materials
    app.delete("/materiales", materiales.deleteAll);
};   