import connection from "../models/config.js";
import { searchPopularAlbums } from "./itunesApi.js";
const con = connection.promise();

const userLikedAlbums = async (userId) => {
  try {
    const [rows] = await con.execute(
      "SELECT idAlbum FROM UserAlbum WHERE idUser = ?",
      [userId]
    );
    return rows.map((album) => album.idAlbum);
  } catch (error) {
    console.error(
      "Error al obtener los álbumes que le gustan al usuario:",
      error
    );
    throw error;
  }
};

const albumExists = async (albumId) => {
  const [result] = await con.execute("SELECT * FROM Album WHERE idAlbum = ?", [
    albumId,
  ]);
  return result.length;
};

const insertAlbum = async (albumDTO) => {
  try {
    await con.execute(
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
    console.log("Álbum insertado con éxito");
  } catch (error) {
    console.error("Error al insertar el álbum:", error);
    throw error;
  }
};

const checkAssociationExistence = async (albumId, userId) => {
  try {
    const [result] = await con.execute(
      "SELECT count(*) as count FROM UserAlbum WHERE idAlbum = ? AND idUser = ?",
      [albumId, userId]
    );
    return result[0].count;
  } catch (error) {
    console.error("Error al verificar la existencia de la asociación:", error);
    throw error;
  }
};

const deleteAssociation = async (albumId, userId) => {
  try {
    await con.execute(
      "DELETE FROM UserAlbum WHERE idAlbum = ? AND idUser = ?",
      [albumId, userId]
    );
    console.log("Asociación eliminada con éxito");
  } catch (error) {
    console.error("Error al eliminar la asociación:", error);
    throw error;
  }
};

const insertAssociation = async (albumId, userId) => {
  try {
    await con.execute(
      `INSERT INTO UserAlbum SET idAlbum = ?, idUser = ?`,
      [albumId, userId]
    );
    console.log("Asociación creada con éxito");
  } catch (error) {
    console.error("Error al crear la asociación:", error);
    throw error;
  }
};

const searchPopularAlbumsWithLikes = async (userId) => {
  try {
    const popularAlbums = await searchPopularAlbums();
    const userLikedAlbumsIds = await userLikedAlbums(userId);
    const popularAlbumsWithLikes = popularAlbums.map(album => {
      const isLikedByUser = userLikedAlbumsIds.includes(album.collectionId);
      return { ...album, isLikedByUser };
    });
    return popularAlbumsWithLikes;
  } catch (error) {
    console.error('Error al cargar los álbumes populares con información de likes:', error);
    throw error;
  }
};

export {
  userLikedAlbums,
  albumExists,
  insertAlbum,
  checkAssociationExistence,
  deleteAssociation,
  insertAssociation,
  searchPopularAlbumsWithLikes
};
