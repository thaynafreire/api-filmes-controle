create database db_controle_filmes_ab;

use db_controle_filmes_ab;

#tem que obrigatoriamente comecar com o tipo
create table tbl_filme(
	id int not null primary key auto_increment,
	nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200)
);

drop table tbl_teste;

create table tbl_usuario(
	id int not null primary key auto_increment,
	nome varchar(45) not null,
    email varchar(80) not null,
    username varchar(45) not null,
    data_nascimento date not null,
    senha varchar(45) not null
);

create table tbl_idioma(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sigla varchar(5) not null,
);

create table tbl_plataforma(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_premiacao(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_diretor(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_genero(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    descricao varchar(100) not null
);

create table tbl_classificacao(
    id int not null primary key auto_increment,
    idade_indicativa varchar(2) not null,
    descricao varchar(100)
);
