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
import { Login } from './clasesEntidad.js';

let logins=[];
let connection;
let profecionales;
let medicamentos;

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud2',
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
                //console.log(result);
               // callback(result);
            }
        });
    }
});
function agregarMedico(medico,callback){
    const sql = "INSERT INTO `profecional` (`idrefeps`, `nombre`, `apellido`, `documento`, `profecion`, `especialidad`, `domicilio`, `matriculaprofecioinal`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const valores = [medico.refepsProfecional,medico.nombreProfecional,medico.apellidoProfecional,medico.dniProfecional,medico.profecionProfecional,medico.especialidadProfecional,  medico.domicilioProfecional,medico.matriculaProfecional];
    connection.connect(function(err) {
        if (err) {
            callback (err);
        } else {
            connection.query(sql,valores, function(err, result) {
                if (err) {
                    callback (err);
                } else {
                   // console.log(result);
                   // callback(result);
                   if (result.affectedRows > 0) {
                    callback(null,"Inserción exitosa en la base de datos.");
                    // callback(result);
                } else {
                    callback(null,"No se insertaron filas en la base de datos.");
                }
                }
            });
        }
    });
}
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
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT * FROM `login` where 1", function(err, result, fields) {
            if (err) {
                throw err;
            } else {
                //console.log(result);
                for(let log of result){
                    let logi=new Login(log.id_login,log.id_medico,log.usuario_login,log.clave_login);
                    logins.push(logi);
                }
                console.log(logins);
            }
        });
    }
});
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
 
export { buscarID,agregarMedico,profecionales,medicamentos ,logins};

