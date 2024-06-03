import { connection } from "./conexxionBD.js";
//import { traerPaciente } from '../controlador/conexxion.js';
import { Paciente } from "./clasesEntidad.js";

let pacientes=[];
connection.connect( function(err) {
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
function todosSexo(caracter){
    
    return new Promise((resolve, reject) => {
       // console.log(`caracter entrando a la funsion ${caracter}`);
       // let aux = `${dni}%`;
       // console.log(`auxiliar ${aux}`);
        connection.connect(function(err) {
            if (err) {
                return reject(err);
            }
            connection.query('SELECT * FROM `sexo` WHERE 1',
                
                function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                   // let obra=result;
                  // console.log(result);
                    //console.log(result);
                    //let pacientes = result.map(pac => new Paciente(pac.nombre, pac.apellido, pac.dni_persona, pac.id_paciente, pac.fecha_nacimiento, pac.nombre_sexo));//like ?
                    resolve(result);
                }
      );
        });
    });
}
 async function createPaciente(paciente){
try {
    connection.beginTransaction(async function(){
        const [results] = await connection.query(
            'INSERT INTO `persona`(`nombre`, `apellido`, `dni_persona`, `estado_persona`) VALUES (?,?,?,?)',
            [paciente.nombre, paciente.apellido, paciente.dni, paciente.estado]
        );
        if(results.affectedRows !==1){
             connection.rollback();
        }else{
            const id_persona=connection.insertId;
            const[result]=await connection.query('INSERT INTO `paciente`( `id_persona`, `fecha_nacimiento`, `id_sexo`) VALUES (?,?,?)'
        [id_persona,paciente.fecha_nacimiento,paciente.sexo]);
        if(result.affectedRows !==1){
            connection.rollback();
        }else{
            const id_paciente=connection.insertId;
            const[result]=await connection.query('INSERT INTO `paciente_obra_social_plan`(`id_paciente`, `id_plan`) VALUES (?,?)'
        [id_paciente,paciente.idPlanObraSocial]);
        if(result.affectedRows !==1){
            connection.rollback();
        }else{
            connection.commit();
            return { success: true };
        }
        }
        }
    })
} catch (error) {
    connection.rollback();
}finally {
    if (connection) await connection.end();
}
}

export{pacientes,buscarPacienteDni,todosSexo,createPaciente};
