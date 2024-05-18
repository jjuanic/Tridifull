import AlbumDTO from "../models/albumDTO.js";
import connection from "../models/config.js";
const con = connection.promise();

const indexPage = async (req, res) => {
  try {
    res.render("index");
  } catch {
    console.log("error en la consulta");
  }
};

const likeAlbum = async (req, res) => {
  try {
    const userId = req.user; // ID del usuario desde el token

    const {
      albumId,
      collectionName,
      artworkUrl100,
      artistName,
      collectionPrice,
      primaryGenreName,
    } = req.body;

    const albumDTO = new AlbumDTO(
      albumId,
      collectionName,
      artworkUrl100,
      artistName,
      collectionPrice,
      primaryGenreName
    );

    // Verificamos la existencia del Album en la base de datos, si nó, la registramos.
    // Si existe, solo creamos la tabla UserAlbum y adentro

    // Consulta SQL para verificar si el álbum ya existe

    const [result] = await con.execute(
      "SELECT * FROM Album WHERE idAlbum = ?",
      [albumId]
    );
    const count = result.length;

    if (count == 0) {
      console.log("Álbum no registrado, se hace el insert");
      const [result] = await con.execute(
        `INSERT INTO Album SET idAlbum = ?, collectionName = ?, artworkUrl100 = ?, artistName = ?, collectionPrice = ?, primaryGenreName = ?`,
        [
          albumDTO.albumId,
          albumDTO.collectionName,
          albumDTO.artworkUrl100,
          albumDTO.artistName,
          albumDTO.collectionPrice,
          albumDTO.primaryGenreName,
        ]
      );
    }

    // Verificamos si el usuario ya le dió like a el álbum, si le dio like, se lo quitamos, sinó, se lo agregamos
    const [resultAsociationExist] = await con.execute(
      "SELECT count(*) as count FROM UserAlbum WHERE idAlbum = ? AND idUser = ?",
      [albumId, userId]
    );
    console.log(resultAsociationExist[0].count);

    if (resultAsociationExist[0].count === 1) {
      console.log("asociación existente, se procede a eliminar");
      const [resultAsociationDrop] = await con.execute(
        "DELETE FROM UserAlbum WHERE idAlbum = ? AND idUser = ?",
        [albumId, userId]
      );

    } else {
      // creamos la asociación entre User y Album
      console.log('Se crea la asociación');
      const [resultAsociation] = await con.execute(
        `INSERT INTO UserAlbum SET idAlbum = ?, idUser = ?`,
        [albumId, userId]
      );
    }

    // Ver que hacer con lo de abajo, ojalá agregar notificaciones
    res.render("index", { notificacion: "Album Añadido con éxito" });
  } catch (err) {
    console.log(err);
    res.render("index", { notificacion: "El álbum no pudo añadirse" });
  }
};

// const logoutUser = (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/login');
// };

export {
  indexPage,
  likeAlbum,
  // logoutUser
};
