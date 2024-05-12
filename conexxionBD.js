/*import mysql from'mysql2';
let connection;
//function conectarBD(){

 connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'registrodesalud',
port: 3306
});
//}
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
export{buscarID};*/
import mysql from 'mysql2';

let connection;

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud',
    port: 3306
});

/*sync function buscarID(id) {
    try {
        await connection.connect();
        const result = await connection.promise().query("SELECT * FROM `profecional` WHERE id=?", [id]);
        //console.log(result[0]);
        return result[0];
    } catch (error) {
        throw error;
    } 
}*/
function buscarID(id, callback) {
    connection.connect(function(err) {
        if (err) {
            throw err;
        } else {
            connection.query("SELECT * FROM `profecional` WHERE id=?", [id], function(err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    //console.log(result);
                    callback(result);
                }
            });
        }
    });
}
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT * FROM `paciente` ", function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result);
               // callback(result);
            }
        });
    }
});
export { buscarID };

