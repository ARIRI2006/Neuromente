CREATE DATABASE neuromente_db;

USE neuromente_db;

CREATE TABLE cadastro(
	id INT auto_increment primary key,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE post(
	id INT auto_increment primary key,
    nome VARCHAR(255) NOT NULL,
    relato TEXT NOT NULL,
    imagem VARCHAR(255)
);
