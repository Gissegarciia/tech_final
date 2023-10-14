// Servidor de Express
const express = require('express');
const http = require('http');
//const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
//DB
const connection = require('./database.js');
//Model Class
const Usuario = require('../models/Usuario.js');
const Cursos = require('../models/Cursos.js');
const Pago = require('../models/Pago.js');
const Recibo = require('../models/Recibo.js');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        //CLASS
        this.user = new Usuario();
        this.cursos = new Cursos();
        this.pago = new Pago();
        this.recibo = new Recibo();

    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        //JSON
        this.app.use(express.json());

        // CORS
        this.app.use(cors());

        this.app.post('/register', (req, res) => {
            try {
                this.user.user_Register_DB(req);
            } catch (error) {
                console.log(error);
            }
        });

        this.app.post('/login', (req, res) => {
            this.user.user_LogIn_DB(req, res);
        });

        this.app.get('/cursos', (req, res) => {
            this.cursos.get_All_Courses_DB(res);
        });

        this.app.post('/get-course', (req, res) => {
            this.cursos.get_Course_By_ID(req, res);
        });

        this.app.get('/pagos', (req, res) => {
            this.pago.get_Empresas_From_DB(res);
        });

        this.app.post('/validar-pago', (req, res) => {
            this.pago.validate_pay_course(req, res);
        });

        this.app.post('/my-courses', (req, res) => {
            this.cursos.get_Courses_By_ID_Student(req, res);
        });
        
        this.app.post('/get-module', (req, res) => {
            this.cursos.get_Course_Selected_By_ID_User(req, res);
        });

        this.app.post('/obtener-recibos', (req, res) => {
            this.recibo.get_Recibos_By_ID_User(req, res);
        });

        /*this.app.post('/get-recibo', (req, res) => {
            this.recibo.get_Recibos_By_ID_Pago(req, res);
        });*/

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    //configurarSockets() {
    //    new Sockets( this.io );
    //}

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        //this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;