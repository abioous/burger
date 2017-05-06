CREATE DATABASE burgers_db;
CONNECT burgers_db;


CREATE TABLE burgers(
id INT NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(255) NOT NULL,
devoured boolean not null default 0,
date TIMESTAMP NOT NULL,
PRIMARY KEY(id)
); 




