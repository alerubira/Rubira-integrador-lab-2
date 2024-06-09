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
async function todasPrestaciones(caracter){
let query='SELECT p.id_practica,p.nombre_practica,pr.id_procedimiento,pr.nombre_procedimiento,e.id_examen,e.nombre_examen FROM `practica` p join practica_procedimiento pp on p.id_practica=pp.id_practica join procedimiento pr on pr.id_procedimiento=pp.id_procedimiento join practica_examen pe ON pe.id_practica=p.id_practica join examen e on e.id_examen=pe.id_examen WHERE 1;';
let prestacionesTodas=await consulta1(query,caracter);
//console.log(`en medicamento ${caracter} ${prestacionesTodas}`);
return prestacionesTodas;
}
async function ladoTodos(caracter){
    let query='SELECT * FROM `lado` WHERE 1;';
    let lados=await consulta1(query,caracter);
    return lados;
}
export{todoGenericos,todasAdministracion,todasPrestaciones,ladoTodos}