import { mapAlbumDataToViewModel } from "../models/AlbumViewModel.js";
import { userLikedAlbumsDTO } from "../services/albumService.js";
import { searchAlbums } from "../services/itunesApi.js";


const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

const searchPage = async (req, res) => {
    const search = req.body.searchInput
    console.log(search);

    const albums = await searchAlbums(search)

//   console.log(albums);

    res.render('search', {popularAlbums: albums});
};

const profilePage = async (req, res) => {

    const userId = req.user; // ID del usuario desde el token

    console.log(userId);
    
    const albumsUser = await userLikedAlbumsDTO(userId);
    
    const mappedAlbums = albumsUser.map(album => mapAlbumDataToViewModel(album));
    
    // console.log(mappedAlbums);

    // res.render('index', {title:'Profile', popularAlbums:albumsUser})
    res.render('profile', {title:'Profile', albums: mappedAlbums})
};


export {
    logoutUser,
    profilePage,
    searchPage
};