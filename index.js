const express = require("express");

const app = express();
const bodyParser = require("body-parser");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.send("Trabajen!!!");
});

// require("./app/routes/login.routes.js")(app);
require("./app/onefiles/login.js")(app);
require("./app/routes/videos.routes.js")(app);
require("./app/routes/usuarios.routes.js")(app);
require("./app/routes/horarios.routes.js")(app);
require("./app/routes/materiales.routes.js")(app);
require("./app/routes/tipo.routes.js")(app);
require("./app/routes/curso.routes.js")(app);
require("./app/routes/carrera.routes.js")(app);
require("./app/routes/asignacion.routes.js")(app);
require("./app/routes/tareas.routes.js")(app);

app.listen(process.env.PORT || 5000);   