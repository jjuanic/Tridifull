create database tridifull;

use tridifull;

create table User (
idUser int not null AUTO_INCREMENT primary key,
 username varchar(255) not null,
 password varchar(60) not null,
 email varchar(255) not null,
 creationDate Date not null
);

create table Album (
idAlbum int AUTO_INCREMENT not null primary key,
name varchar(50) not null,
artist varchar(50) not null
);

create table UserAlbum(
idAlbum int, idUser int,
primary key (idAlbum,idUser),
foreign key (idAlbum) references Album (idAlbum),
foreign key (idUser) references User (idUser)
);
