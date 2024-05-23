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
export{pacientes};
