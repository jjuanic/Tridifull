
const indexPage = async (req, res) => {
    try {
        res.render('index')
    } catch {
        console.log('error en la consulta');
    }
};

const likeAlbum = async (req,res) =>{
    try {
        // Ver que hacer con lo de abajo, ojalá agregar notificaciones
        const userId = req.user; // Aquí obtienes el ID del usuario desde el token
        const { albumId, collectionName, artworkUrl100, artistName, collectionPrice, primaryGenreName } = req.body;

        

        console.log(userId,albumId);

        res.render('index', {notificacion:'Album Añadido con éxito'})
    } catch {
        res.render('index', {notificacion:'El álbum no pudo añadirse'})
    }
}

// const logoutUser = (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/login');
// };

export {
    indexPage,
    likeAlbum
    // logoutUser
};

