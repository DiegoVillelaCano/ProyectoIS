const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.codigou = usuario.codigou;
  this.carnet = usuario.carnet;
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.user = usuario.user;
  this.idc = usuario.idc;
  this.codigot = usuario.codigot;
  this.password = usuario.password;
  this.email = usuario.email;
};

Usuario.getAll = (where, result) => {
  sql.query("SELECT * FROM usuario" + where, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuario: ", res);
    result(null, res);
  });
};

Usuario.create = (newUser, result) => {
  sql.query("INSERT INTO usuario SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Usuario creado: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Usuario.findById = (userId, result) => {
  sql.query(`SELECT * FROM usuario WHERE codigou = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // usuario no encontrado con el código enviado
    result({ kind: "not_found" }, null);
  });
};

Usuario.updateById = (userId, usuario, result) => {
  sql.query(
    "UPDATE usuario SET carnet = ?, nombre = ?, apellido = ?, user = ?, idc = ?, codigot = ?, password = ?, email = ? WHERE codigou = ?",
    [usuario.carnet, usuario.nombre, usuario.apellido, usuario.user, usuario.idc, usuario.codigot, usuario.password, usuario.email, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // usuario no encontrado con el código enviado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("usuario actualizado: ", { userId: userId, ...usuario });
      result(null, { userId: userId, ...usuario });
    }
  );
};

Usuario.remove = (userId, result) => {
  sql.query("DELETE FROM usuario WHERE codigou = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // usuario no encontrado con el código enviado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("usuario borrado con codigou: ", userId);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`borrados ${res.affectedRows} usuario`);
    result(null, res);
  });
};

module.exports = Usuario;
