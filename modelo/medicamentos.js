import { consulta1} from "./conexxionBD.js";

async function todoGenericos(caracter){
let query='SELECT * FROM `nombre_generico` WHERE 1';
let remedios=await consulta1(query,caracter);
return remedios;
}
export{todoGenericos}