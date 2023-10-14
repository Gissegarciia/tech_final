const connection = require('../services/database');

class Usuario {

    constructor() {
        this.name = "",
        this.lastName = "",
        this.email = "",
        this.phone = "",
        this.password = "",
        this.rol = 1
    }

    user_Register_DB(req) {
        this.name = req.body.name;
        this.lastName = req.body.lastName;
        this.email = req.body.email;
        this.phone = req.body.phone;
        this.password = req.body.password;

        connection.query("INSERT INTO usuario (nombre, apellido, correo, telefono, contrasena, id_rol) VALUES (?,?,?,?,?,?)", [this.name, this.lastName, this.email, this.phone, this.password, this.rol], (err, result) => {
            console.log(err);
        });
    }

    user_LogIn_DB(req, res) {
        this.email = req.body.email;
        this.password = req.body.password;

        connection.query("SELECT * FROM usuario WHERE correo = ? and contrasena = ?", [this.email, this.password], (err, result) => {
            if (err) {
                res.send({err: err});
            } else if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Usuario y/o contraseña incorrectos!"});
            }
        });
    }

}

module.exports = Usuario;