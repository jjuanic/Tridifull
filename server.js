
//import del servidor
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

//conexión a la base de datos
const connection = require('./models/config');

const server = app.listen(PORT, () =>{
    console.log(`Server listening en new file 'Server' on http://localhost:${PORT}`);
});
