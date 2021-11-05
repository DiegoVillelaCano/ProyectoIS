const sql = require("./db.js");

// constructor
// Datos a devolver al frontend
const Video = function(video) {
    this.idvideo = video.idvideo;
    this.codigoc = video.codigoc;
    this.nombre = video.nombre;
    this.descripcion = video.descripcion;
    this.dia = video.dia;
    this.hinicio = video.hinicio;
    this.hfinal = video.hfinal;
    this.video = video.video;
  };

// método get para devolver todas las videoconferencias calendarizadas
  Video.getAll = (codigoc, token, result) => {
    sql.query("SELECT token FROM token WHERE token = '" + token + "'", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;}

        if (res.length == 0){
            console.log("error: ", "Token inválido.");
            result(null, "Token inválido.");
            return;
          } else {
            sql.query("SELECT a.idvideo, a.codigoc, b.nombre, a.descripcion, a.dia, a.hinicio, a.hfinal, a.video FROM videoconferencia a JOIN curso b ON a.codigoc = b.codigoc WHERE a.codigoc = ?", codigoc, (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
          
              //A manera de log, escribo en consola el resultado a devolver
              console.log("videoconferencias: ", res);
        
              //Devuelvo el resultado de la consulta
              result(null, res);
            });
        }
    });
  };
  
// método get para devolver todas las videoconferencias calendarizadas
Video.getGrabadas = (codigoc, token, result) => {
  sql.query("SELECT token FROM token WHERE token = '" + token + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;}

    if (res.length == 0){
        console.log("error: ", "Token inválido.");
        result(null, "Token inválido.");
        return;
      } else {
        sql.query("SELECT a.idvideo, a.codigoc, b.nombre, a.descripcion, a.dia, a.hinicio, a.hfinal, a.video FROM videoconferencia a JOIN curso b ON a.codigoc = b.codigoc WHERE a.codigoc = ? AND a.hfinal IS NOT NULL", codigoc, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          //A manera de log, escribo en consola el resultado a devolver
          console.log("videoconferencias: ", res);
    
          //Devuelvo el resultado de la consulta
          result(null, res);
        });
    }
  });
}

module.exports = Video;
