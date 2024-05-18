
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
        res.render('index', {notificacion:'Album Añadido con éxito'})
    } catch {
        res.render('index', {notificacion:'El álbum no pudo añadirse'})
    }
}

export {
    indexPage,
    likeAlbum
};

