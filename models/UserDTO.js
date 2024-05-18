// Definición del DTO Usuario
class UserDTO {
    constructor(_username, email, password,creationDate) {
        this._username = _username;
        this._email = email;
        this._password = password;
        this._creationDate = creationDate
    }

    // Getters para acceder a las propiedades del usuario
    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get creationDate() {
        return this._creationDate;
    }
}

// Exportar el DTO Usuario
export default UserDTO
