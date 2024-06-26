import { mapAlbumDataToViewModel } from "../models/AlbumViewModel.js";
import { userLikedAlbumsDTO, searchAlbumsWithLikes } from "../services/albumService.js";
import { searchAlbums } from "../services/itunesApi.js";


const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

const searchPage = async (req, res) => {
    const searchForm = req.body.searchInput 

    if (!searchForm || searchForm.trim() === ''){
        res.locals.search = req.cookies.search || '';
    } else {
        // creo una cookie donde guardar la búsqueda, así puedo acceder siempre a la misma y recargar la página realizando la misma búsqueda
        res.cookie('search', searchForm, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000*4 
        });
        res.locals.search = searchForm;
    }

    const userId = res.locals.userId;
    var albums = '';
    if(userId) {
        albums = await searchAlbumsWithLikes(userId,res.locals.search)
    } else {
        albums = await searchAlbums(res.locals.search)
    }

    res.render('search', {popularAlbums: albums, searchInput: res.locals.search});
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

const faqPages = (req, res) => {
    res.render('faq');
};

const historyPage = (req, res) => {
    res.render('history');
};



export {
    logoutUser,
    profilePage,
    searchPage,
    faqPages,
    historyPage
};