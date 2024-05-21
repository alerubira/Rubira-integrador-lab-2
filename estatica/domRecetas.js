let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let aux;
function Focultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
 document.getElementById('dniP').addEventListener('input', function() {
                let input = this.value;
                if (input.length === 3) {
                    //console.log(input); // Aquí puedes realizar la acción que desees con los tres caracteres capturados
                    aux= fech(input,'/buscarPacientes')
                   }
                  
            });
function fech(input,endpoint){
        fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type':  'text/plain'
                },
                body:input
            })
            .then(response => response.text())
            .then(data => {
                console.log('Success cliente:', data); // Maneja la respuesta del servidor aquí
                return data;
            })
            .catch((error) => {
                console.error('Error:', error); // Maneja los errores aquí
            });
}         
selectTipo.addEventListener("change", function() {
        Focultar();
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
         }
    });