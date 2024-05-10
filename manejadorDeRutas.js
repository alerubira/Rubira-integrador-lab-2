import {buscarID} from './conexxionBD.js'; 
 let profecionalI;
function verificarProfecional(res,idProfecional,encabezado){

   
buscarID(idProfecional, function(result) {
  // Aquí puedes manejar los resultados de la consulta
// console.log(result);
   profecionalI=result;
    if (profecionalI.length===1) {
      //console.log(profecional);
      
      // Redirigir al usuario al endpoint '/recetas'
    return res.redirect('/recetas');
    }else{
      let alerta=true;
    return res.render('vistaPrincipal',{encabezado,alerta})
    }
});

}
export{profecionalI,verificarProfecional};
