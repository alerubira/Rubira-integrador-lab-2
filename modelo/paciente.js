import { connection } from "./conexxionBD.js";
//import { traerPaciente } from '../controlador/conexxion.js';
import { Paciente } from "./clasesEntidad.js";

let pacientes=[];
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT id_paciente,nombre,apellido,dni_persona,fecha_nacimiento,nombre_sexo FROM `paciente` pa JOIN `persona` pe on pa.id_persona=pe.id_persona join `sexo` s on s.id_sexo=pa.id_sexo WHERE 1; ", function(err, result) {
            if (err) {
                throw err;
            } else {
                //console.log(result);
                for(let pac of result){
                    let aux = new Paciente(pac.nombre,pac.apellido,pac.dni_persona,pac.id_paciente ,pac.fecha_nacimiento,pac.nombre_sexo);
                    pacientes.push(aux);
                }
               // callback(result);
               //console.log(pacientes);
             // traerPaciente(pacientes); 
            }
        });
    }
});
function buscarPacienteDni(dni) {
    return new Promise((resolve, reject) => {
        console.log(`dni entrando a la funsion ${dni}`);
        let aux = `${dni}%`;
       // console.log(`auxiliar ${aux}`);
        connection.connect(function(err) {
            if (err) {
                return reject(err);
            }
            connection.query(
                "SELECT id_paciente, nombre, apellido, dni_persona, fecha_nacimiento, nombre_sexo FROM `paciente` pa JOIN `persona` pe ON pa.id_persona=pe.id_persona JOIN `sexo` s ON s.id_sexo=pa.id_sexo WHERE `dni_persona` LIKE ?", 
                [aux], 
                function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                    console.log(result);
                    let pacientes = result.map(pac => new Paciente(pac.nombre, pac.apellido, pac.dni_persona, pac.id_paciente, pac.fecha_nacimiento, pac.nombre_sexo));//like ?
                    resolve(pacientes);
                }
            );
        });
    });
}

export{pacientes,buscarPacienteDni};
