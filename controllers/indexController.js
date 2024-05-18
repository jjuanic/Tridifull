import AlbumDTO from "../models/AlbumDTO.js";
import connection from "../models/config.js";
import {
  albumExists,
  insertAlbum,
  checkAssociationExistence,
  deleteAssociation,
  insertAssociation
} from "../services/albumService.js";

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
      primaryGenreName
    } = req.body;

    // Verificar si alguno de los campos es undefined
    if (!albumId || !collectionName || !artworkUrl100 || !artistName || !collectionPrice || !primaryGenreName) {
      throw new Error('One or more fields are undefined');
    }

    const albumDTO = new AlbumDTO(
      albumId,
      collectionName,
      artworkUrl100,
      artistName,
      collectionPrice,
      primaryGenreName
    );

    const count = await albumExists(albumId); // Asegúrate de esperar la resolución de la promesa

    if (count === 0) {
      console.log("Álbum no registrado, se hace el insert");
      await insertAlbum(albumDTO);
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

    const fromProfile = req.body.fromProfile
    const fromSearch = req.body.fromSearch

    // Enviamos la respuesta al cliente
    if (fromProfile == "true"){
      console.log('desde perfil');
      res.redirect('/nav/profile')
    } else {
      if (fromSearch == "true"){
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa from search');
        res.redirect('nav/search')
      }else {
        res.redirect("/")};
      }

  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export {
  indexPage,
  likeAlbum
};
