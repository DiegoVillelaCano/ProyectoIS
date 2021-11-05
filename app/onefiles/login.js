const conn = require ('../models/db.js');
let usuariox;
module.exports = (app) => {
    app.post('/login', (req, res ,next) => {
        const {user, password} = req.body;

        var crypto = require("crypto");
        let r = crypto.randomBytes(25).toString('hex');
        let query2 = "INSERT INTO token(token) VALUES ('"+ r +"')";

        let query = "SELECT * FROM usuario WHERE user = '"+ user +"'AND password = '"+ password +"'";
        conn.query(query,(err, rows, cols) => {
            conn.query(query2,(err, rows, cols)  => {});
            if (rows.length > 0) {
                usuariox = rows[0].user
                res.json({status: 1, message: "Bienvenido", usuario: usuariox, Token: r });}
            else{
                
                res.json({status: 404, mensaje: "Usuario o contraseña incorrectos"});
            }
        });
    });
}