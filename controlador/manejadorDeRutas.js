import {buscarID} from '../modelo/conexxionBD.js'; 
import { traerProfecionl} from './conexxion.js';
import { agregarMedico } from '../modelo/conexxionBD.js';
 
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
function crearProfecional(req,res,mensajeExito){
  mensajeExito="";
  const profecionalCreado=req.body;
   //mensajeExito=agregarMedico(profecionalCreado);
   //console.log(profecionalCreado);

   //res.redirect("/medicos");
   agregarMedico(profecionalCreado, (error, resultado) => {
    if (error) {
        // Maneja el error aquí
        console.error(error);
    } else {
        // Maneja el resultado aquí
        console.log(resultado);
        mensajeExito=resultado;
        // Puedes redirigir después de capturar la respuesta
        res.redirect("/medicos");
    }
});
}
export{verificarProfecional,crearProfecional};
