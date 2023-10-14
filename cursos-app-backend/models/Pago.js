const connection = require("../services/database");

class Pago {

    constructor() {
        this.nombreEmpresa = "";
    }

    get_Empresas_From_DB(res) {
        connection.query('SELECT * FROM empresas_pago', (err, result) => {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: 'No hay métodos de pago registrados en la plataforma!'});
            }
        });
    }

    validate_pay_course(req, res) {
        const id_curso = req.body.idCurso;
        const id_empresa = req.body.id_empresa;
        const id_alumno = req.body.id_alumno;
        connection.query('INSERT INTO recibo_pago (id_curso, metodo_pago, id_alumno, estado_pago) VALUES (?,?,?,?)',[id_curso, id_empresa, id_alumno, 1], (err, result) => {
            if (err) {
                res.send({message: 'Ha ocurrido un error al realizar el pago!'});
            } else {
                connection.query('INSERT INTO alumno_clase (id_alumno, id_curso, nota, estado_evaluacion) VALUES (?,?,?,?)', [id_alumno, id_curso, 0, 0], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.send({token: 'Pago satisfactorio!'});
            }
        })
    }

}

module.exports = Pago;