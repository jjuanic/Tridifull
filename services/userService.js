import connection from '../models/config.js';
import UserDTO from '../models/UserDTO.js'

const con = connection.promise();


async function checkIfUserExists(userDTO) {
    const [rows] = await con.execute('SELECT COUNT(*) AS count FROM User WHERE email = ? OR username = ?', [userDTO.email, userDTO.username]);
    const count = rows[0].count;
    return count > 0;
}

async function insertUser(userDTO) {
    const [result] = await con.execute(
        'INSERT INTO User SET username = ?, password = ?, email = ?, creationDate = ?',
        [userDTO.username, userDTO.password, userDTO.email, userDTO.creationDate]
    );
    return result;
}

async function selectUser(user){
    const [result] = await con.execute('SELECT * FROM User WHERE username = ?', [user]);
    return result;
}



export {
    checkIfUserExists,
    insertUser,
    selectUser
}