import {buscarID} from './conexxionBD.js'; 
import { traerProfecionl} from './conexxion.js';
 
function verificarProfecional(res,idProfecional,encabezado){

   
 buscarID(idProfecional, function(result) {
  // Aquí puedes manejar los resultados de la consulta
// console.log(result);
   
    if (result.length===1) {
      //console.log(profecional);
      traerProfecionl(result);
      // Redirigir al usuario al endpoint '/recetas'
    return res.redirect('/recetas');
    }else{
      let alerta=true;
    return res.render('vistaPrincipal',{encabezado,alerta})
    }
});

}
export{verificarProfecional};
