let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
function Focultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
selectTipo.addEventListener("change", function() {
        Focultar();
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
         }
    });