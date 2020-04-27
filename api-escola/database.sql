CREATE DATABASE escola CHARSET = Latin1 COLLATE = latin1_swedish_ci;

USE escola;

CREATE TABLE escola (
  id int PRIMARY KEY AUTO_INCREMENT,
  nome text,
  qtd_alunos int
);