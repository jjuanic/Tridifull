import { mapAlbumDataToViewModel } from "../models/AlbumViewModel.js";
import { userLikedAlbumsDTO } from "../services/albumService.js";


const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
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
    profilePage
};