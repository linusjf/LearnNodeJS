CREATE DATABASE IF NOT EXISTS demo;
CREATE TABLE IF NOT EXISTS demo.people (
    id int not NULL AUTO_INCREMENT primary key,
    name VARCHAR(50) NOT NULL,
    created_on timestamp NOT NULL default CURRENT_TIMESTAMP);
TRUNCATE TABLE demo.people;
INSERT INTO demo.people (name) 
VALUES ('rob'), 
       ('tracy'), 
       ('sam'), 
       ('duke');
