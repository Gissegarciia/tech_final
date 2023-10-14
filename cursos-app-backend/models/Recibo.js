const connection = require("../services/database");


class Recibo {

    constructor() {
        this.id_pago = null;
        this.id_curso = null;
        this.metodo_pago = "";
        this.id_alumno = null;
        this.estado_pago = 0;
    }

    get_Recibos_By_ID_User(req, res) {
        this.id_alumno = req.body.idAlumno.id;
        connection.query('SELECT id_pago, nombre_curso, descripcion, valor, nombre, apellido, correo, telefono, nombre_empresa FROM recibo_pago R INNER JOIN cursos C ON R.id_curso = C.id_curso INNER JOIN usuario U ON R.id_alumno = U.id INNER JOIN empresas_pago E ON R.metodo_pago = E.id_empresa WHERE id_alumno = ?', [this.id_alumno], (err, result) => {
            if(err) {
                res.send(err);
            } else if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: '¡No has comprado ningún curso en la plataforma!'});
            }
        });
    }

    get_Recibos_By_ID_Pago(req,res) {
        this.id_pago = req.body.idRecibo;
        connection.query('SELECT id_pago, nombre_curso, descripcion, valor, nombre, apellido, correo, telefono, nombre_empresa FROM recibo_pago R INNER JOIN cursos C ON R.id_curso = C.id_curso INNER JOIN usuario U ON R.id_alumno = U.id INNER JOIN empresas_pago E ON R.metodo_pago = E.id_empresa WHERE id_pago = ?', [this.id_pago], (err, result) => {
            if(err) {
                res.send(err);
            } else if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: '¡No has comprado ningún curso en la plataforma!'});
            }
        });
    }

}

module.exports = Recibo;