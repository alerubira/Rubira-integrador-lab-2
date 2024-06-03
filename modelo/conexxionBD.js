
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud2',
    port: 3306
});
function consulta1(query,caracter){
    return new Promise((resolve, reject) => {
        // console.log(`caracter entrando a la funsion ${caracter}`);
        // let aux = `${dni}%`;
        // console.log(`auxiliar ${aux}`);
         connection.connect(function(err) {
             if (err) {
                 return reject(err);
             }
             connection.query(query,caracter,
                 
                 function(err, result) {
                     if (err) {
                         return reject(err);
                     }
                    // let obra=result;
                    console.log(result);
                     //console.log(result);
                     //let pacientes = result.map(pac => new Paciente(pac.nombre, pac.apellido, pac.dni_persona, pac.id_paciente, pac.fecha_nacimiento, pac.nombre_sexo));//like ?
                     resolve(result);
                 }
       );
         });
     });
}
export{connection,consulta1};





 

