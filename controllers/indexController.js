import AlbumDTO from "../models/albumDTO.js";
import connection from "../models/config.js";
import { albumExists, insertAlbum, checkAssociationExistence, deleteAssociation,insertAssociation } from "../services/albumService.js";
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
  
      console.log('Token: ', userId);
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
  
      const count = albumExists(albumId);
  
      if (count === 0) {
        console.log("Álbum no registrado, se hace el insert");
        await insertAlbum(albumDTO)
      }
  
      const associationCount = await checkAssociationExistence(albumId, userId);
  
      if (associationCount === 1) {
        // Si ya existe la asociación, la eliminamos
        console.log("Asociación existente, se procede a eliminar");
        await deleteAssociation(albumId, userId);

      } else {
        // Si no existe la asociación, la creamos
        console.log("Se crea la asociación");
        await insertAssociation(albumId, userId);
      }
  
      // Enviamos la respuesta al cliente
      res.render("index", { notificacion: "Operación exitosa" });
    } catch (err) {
      console.log(err);
      res.render("index", { notificacion: "Error en la operación" });
    }
  };

// const logoutUser = (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/login');
// };

export {
  indexPage,
  likeAlbum
};
