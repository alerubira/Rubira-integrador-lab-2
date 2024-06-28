import { connection } from "./conexxionBD.js";
import { Medico } from './clasesEntidad.js';
import { consulta1 } from "./conexxionBD.js";
let profecionales;
function buscarMID(id, callback) {
    connection.connect(function(err) {
        if (err) {
            throw err;
        } else{
            
               
            
            connection.query("select id_medico, nombre,apellido,dni_persona,domicilio,nombre_profecion,nombre_especialidad,matricula_profecional FROM persona p JOIN medico m on p.id_persona=m.id_persona join profecion pr on m.id_profecion=pr.id_profecion join especialida es on es.id_especialidad=m.id_especialidad WHERE m.id_medico=?;", [id], function(err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    //console.log(result);
                    let m=new Medico(result[0].id_medico, result[0].nombre,result[0].apellido,result[0].dni_persona,result[0].domicilio,result[0].nombre_profecion,result[0].nombre_especialidad,result[0].matricula_profecional);

                    /*console.log("----------------------");
                    console.log(m);
                    console.log("--------------------------");*/
                   
                    callback(m);
                }
            });
        }
    });
}
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
async function profecionesTodas(caracter){
    let query='SELECT * FROM `profecion` WHERE 1;';
    return await consulta1(query,caracter);
}
async function especialidadesTodas(caracter){
    let query='SELECT * FROM `especialida` WHERE 1;';
    return await consulta1(query,caracter);
}
async function crearMedico(medico){
    console.log('en crear medico');
    console.log(medico);
}
export{crearMedico,buscarMID,agregarMedico,profecionales,profecionesTodas,especialidadesTodas};
