
CREATE DATABASE IF NOT EXISTS sistematico;

USE sistematico;

CREATE TABLE vehiculo ( 
    id INT NOT NULL AUTO_INCREMENT,
    idTipo INT NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idTipo) REFERENCES tipos(id)
 )

CREATE TABLE tipos ( 
    id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO tipos (tipo) VALUES ('moto');
INSERT INTO tipos (tipo) VALUES ('automovil')

SELECT * FROM tipos;

INSERT INTO vehiculo (idTipo, matricula, marca, modelo, anio, color) VALUES (1, 'ABC123', 'Honda', 'CBR 600', 2015, 'Rojo');
INSERT INTO vehiculo (idTipo, matricula, marca, modelo, anio, color) VALUES (1, 'ABC124', 'Toyota', 'Corolla', 2015, 'Rojo');
INSERT INTO vehiculo (idTipo, matricula, marca, modelo, anio, color) VALUES (1, 'ABC125', 'Hyundai', 'Tucson', 2015, 'Rojo');