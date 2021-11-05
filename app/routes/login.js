const conn = require ('../../config/database');
let usuariox;
module.exports = (app) => {
    app.post('/login', (req, res ,next) => {
        const {user, password} = req.body;
        let query = "SELECT * FROM usuario WHERE user = '"+ user +"'AND password = '"+ password +"'";
        conn.query(query,(err, rows, cols) => {
            if (rows.length > 0) {
                usuariox = rows[0].user
                res.json({status: 1, message: "Bienvenido", usuario: usuariox });}
            else{
                
                res.json({status: 404, mensaje: "Usuario o contraseña incorrectos"});
                }
        });
    });   
}