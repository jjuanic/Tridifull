### Tridifull 

App para un Proyecto Final del Curso Fullstack de Franja Morada.

El mismo es una página web donde podemos registrarnos y elegir nuestros álbumes favoritos para llevar una lista de los mismos.
En un futuro, esta aplicación podría expandirse y permitir escribir reviews de albumes, para que sean visibles por todo el mundo, ademas, también podría compartirse el perfil con tus amigos para que vean tu lista de favoritos

## Deploy en Railway
https://tridifull-production.up.railway.app/

## Instalación Local
-Realizamos un git clone del repositorio en el directorio que desee

-Realizamos npm install para instalar las dependencias del proyecto

-Creamos un archivo .env en el root del proyecto, donde tendremos las siguientes variables de entorno

**.env**
```
PORT= // Acá va nuestro puerto de desarrollo
PORTSQL= // Acá va el puerto de nuestro servidor de MySQL
USERSQL= // Acá va el usuario de nuestro servidor de MySQL
PASSWORDSQL= // Acá va la contraseña de nuestro servidor de MySQL
HOSTSQL= // Acá va el HOST de nuestro servidor de MySQL
DATASQL= tridifull // Acá va el nombre de nuestra base de datos, en este caso, Tridifull
SECRETORPRIVATEKEY= 'secretkey123' // Acá va un string aleatorio que se utiliza para la encriptación de contraseñas.  
NODE_ENV = 'production' // Acá va 'production' para el manejo de cookies.
```

## Ejecución del código de MySQL
Necesitamos crear la base de datos, para ello, deben ir a models/Database.sql, ahí tenemos el código de creación para nuestra base de datos, que está compuesta por 3 tablas.

```
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
```

### Ejecución del servidor
Finalmente, luego de tener creada la base de datos, en la terminal del proyecto ejecutamos
```
npm run dev
```
o 
```
npm run start
```



