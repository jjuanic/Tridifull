create database tridifull;

use tridifull;

create table User (
idUser int not null AUTO_INCREMENT primary key,
 username varchar(255) not null,
 password varchar(60) not null,
 email varchar(255) not null,
 creationDate Date not null
);

CREATE TABLE Album (
    idAlbum int not null PRIMARY KEY,
    collectionName VARCHAR(255),
    artworkUrl100 VARCHAR(255),
    artistName VARCHAR(255),
    collectionPrice DECIMAL(10, 2),
    primaryGenreName VARCHAR(255)
);

create table UserAlbum(
idAlbum int, idUser int,
primary key (idAlbum,idUser),
foreign key (idAlbum) references Album (idAlbum),
foreign key (idUser) references User (idUser)
);
