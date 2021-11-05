USE proyecto;

CREATE TABLE carrera (
idc int(11) NOT NULL AUTO_INCREMENT,
carrera varchar(60) NOT NULL,
 PRIMARY KEY (idc));
 
 CREATE TABLE curso ( 
 codigoc int(11) NOT NULL AUTO_INCREMENT,
 nombre char(50),
 PRIMARY KEY (codigoc));
 
 CREATE TABLE tipoUser ( 
 codigot int(11) NOT NULL AUTO_INCREMENT,
 nombre char(50),
 PRIMARY KEY (codigot));

CREATE TABLE usuario (
  codigou int(11) NOT NULL AUTO_INCREMENT,
  carnet int(11) NOT NULL,
  nombre varchar(60) NOT NULL,
  apellido varchar(45) NOT NULL,
  user varchar(15) NOT NULL,
  idc int(11) NOT NULL,
  codigot int(11) NOT NULL,
  password varchar(45) NOT NULL,
  email varchar(70) NOT NULL,
  PRIMARY KEY (codigou),
 FOREIGN KEY (idc) REFERENCES carrera(idc),
 FOREIGN KEY (codigot) REFERENCES tipoUser(codigot));

CREATE TABLE asignacion (
codigoa int(11) NOT NULL AUTO_INCREMENT,
codigou int(11) NOT NULL,
codigoc int(11) NOT NULL,
 PRIMARY KEY (codigoa),
 FOREIGN KEY (codigou) REFERENCES usuario(codigou),
 FOREIGN KEY (codigoc) REFERENCES curso(codigoc));

CREATE TABLE tareas(
  idtarea int(11) NOT NULL AUTO_INCREMENT,
  punteo int(11) NOT NULL,
  descripcion varchar(15) NOT NULL,
  Entrega date NOT NULL,
  codigou int(11) NOT NULL,
 PRIMARY KEY (idtarea),
 FOREIGN KEY (codigou) REFERENCES usuario(codigou));

CREATE TABLE material (
  idmaterial int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(45) NOT NULL,
  descripcion varchar(150) NOT NULL,
  codigoc int(11) NOT NULL,
  PRIMARY KEY (idmaterial),
  FOREIGN KEY (codigoc) REFERENCES curso(codigoc));

CREATE TABLE horario (
  idhorario int(11) NOT NULL AUTO_INCREMENT,
  descripcion varchar(45) NOT NULL,
  hinicio time NOT NULL,
  hfinal time NOT NULL,
  dia date NOT NULL,
  codigou int(11) NOT NULL,
  PRIMARY KEY (idhorario),
  FOREIGN KEY (codigou) REFERENCES usuario(codigou));