const connection = require('../services/database');

class Cursos {

    constructor() {
        this.nombre_curso = "",
        this.descripcion = "",
        this.valor = "",
        this.estado_pago = "",
        this.docente = "",
        this.cursos = []
    }

    get_All_Courses_DB(res) {
        //const cursos = connection.query('SELECT * FROM cursos');
        connection.query('SELECT * FROM cursos', (err, result) => {
            if(result.length > 0) {
                res.send(result);
            } else {
                res.send({message: 'No hay cursos registrados en la plataforma!'});
            }
        });
    }

    get_Course_By_ID(req, res) {
        const id_curso = req.body.idCurso;
        console.log(id_curso);
        connection.query("SELECT * FROM cursos WHERE id_curso = ?", [id_curso], (err, result) => {
            if(result.length > 0) {
                res.send(result);
            } else {
                res.send({message: 'No existe el curso'});
            }
        });
    }

    get_Courses_By_ID_Student(req, res) {
        const id_alumno = req.body.id_alumno;
        connection.query("SELECT * FROM alumno_clase A INNER JOIN cursos C ON A.id_curso = C.id_curso WHERE id_alumno = ?;", [id_alumno], (err, result) => {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: '¡No has adquirido ningún curso!'});
            }
        });
    }

    get_Course_Selected_By_ID_User(req, res) {
        const idAlumnoClase = req.body.idAlumnoClase;
        connection.query("SELECT * FROM alumno_clase A INNER JOIN cursos C ON A.id_curso = C.id_curso WHERE id_alumno_clase = ?;", [idAlumnoClase], (err, result) => {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: '¡El curso no tiene modulos!'});
            }
        });
    }

}

module.exports = Cursos;