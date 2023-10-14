const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'cursos'
});

connection.connect(function(error) {
    if(error) {
        throw error;
    } else {
        console.log('Conexión Exitosa');
    }
});


module.exports = connection;