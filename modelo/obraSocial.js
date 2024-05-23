import { connection } from "./conexxionBD.js";
let obrasSociales;
let planes;
let obraSocialPlan;
console.log("obraSocial:js")
function consultar(consulta){
    connection.connect(function(err) {
        if (err) {
            throw err;
        } else {
            connection.query(consulta, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    return result; 
                }
            });
        }
    });
}
obrasSociales=consultar("SELECT * FROM `obra_social`");
planes=consultar("SELECT * FROM `plan_obra_social`");
obraSocialPlan=consultar("SELECT * FROM `obra_social_plan` ");
export{obrasSociales,planes,obraSocialPlan};
