import mysql from'mysql2';
function conectarBD(){

let connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'registrodesalud',
port: 3306
});
}
function buscarID(id){
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM `profecional` WHERE id=?",[id], function (err,
        result, fields) {
        if (err) throw err;
        console.log(result);
        
        });
        });//finalizar la conexión
        return result;
}
export{conectarBD,buscarID};
