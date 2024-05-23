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



//console.log("conexxionBD");
let connection;

let medicamentos;

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud2',
    port: 3306
});
export{connection};
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




/*connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT * FROM `profecional` where 1", function(err, result, fields) {
            if (err) {
                throw err;
            } else {
               // console.log(result);
               profecionales=result; 
            }
        });
    }
});*/

/*connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT * FROM `medicamento` where 1", function(err, result, fields) {
            if (err) {
                throw err;
            } else {
               // console.log(result);
               medicamentos=result; 
            }
        });
    }
});*/

 

