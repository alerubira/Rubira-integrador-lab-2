import { connection } from "./conexxionBD.js";
let obrasSociales;
let planes;
let obraSocialPlan;

function todasObras(caracter){
    
        return new Promise((resolve, reject) => {
           // console.log(`caracter entrando a la funsion ${caracter}`);
           // let aux = `${dni}%`;
           // console.log(`auxiliar ${aux}`);
            connection.connect(function(err) {
                if (err) {
                    return reject(err);
                }
                connection.query('SELECT * FROM `obra_social` os join plan_obra_social pl on pl.id_obra_social=os.id_obra_social WHERE 1;',
                    
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

function buscarOSIdPaciente(id) {
    return new Promise((resolve, reject) => {
        //console.log(`idPaciente entrando a la funsion ${id}`);
       // let aux = `${dni}%`;
       // console.log(`auxiliar ${aux}`);
        connection.connect(function(err) {
            if (err) {
                return reject(err);
            }
            connection.query('SELECT id_p_o_s_p,nombre_obra_social,nombre_plan FROM `paciente_obra_social_plan`pop join plan_obra_social pl on pl.id_plan=pop.id_plan join `obra_social`os on os.id_obra_social=pl.id_obra_social WHERE id_paciente=?',[id],
                
                function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                    let obra=result;
                    console.log(obra);
                    //console.log(result);
                    //let pacientes = result.map(pac => new Paciente(pac.nombre, pac.apellido, pac.dni_persona, pac.id_paciente, pac.fecha_nacimiento, pac.nombre_sexo));//like ?
                    resolve(obra);
                }
      );
        });
    });
}

//obrasSociales=consultar("SELECT * FROM `obra_social`");
//planes=consultar("SELECT * FROM `plan_obra_social`");
//obraSocialPlan=consultar("SELECT * FROM `obra_social_plan` ");
export{obrasSociales,planes,obraSocialPlan,buscarOSIdPaciente,todasObras};
