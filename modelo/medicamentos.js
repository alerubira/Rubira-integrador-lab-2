import { consulta1} from "./conexxionBD.js";

async function todoGenericos(caracter){
let query='SELECT n_g.id_nombre_generico,nombre_generico,f_f.id_forma,nombre_forma,p.id_presentacion,nombre_presentacion FROM nombre_generico n_g JOIN nombre_generico_forma n_g_f on n_g.id_nombre_generico=n_g_f.id_nombre_generico JOIN forma_farmaceutica f_f on f_f.id_forma=n_g_f.id_forma JOIN nombre_generico_presentacion n_g_p on n_g_p.id_n_g_f=n_g_f.id_n_g_f JOIN presentacion p on n_g_p.id_presentacion=p.id_presentacion WHERE 1;';
let remedios=await consulta1(query,caracter);
return remedios;
}
async function todasAdministracion(caracter){
let query='SELECT * FROM `administracion_medicamento` WHERE 1';
//console.log(`caracter en medicamentos.js ${caracter}`);
let administraciones=await consulta1(query,caracter);
//console.log(`administracion en medicamento.js ${administraciones}`);
return administraciones;
}
export{todoGenericos,todasAdministracion}