let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let aux=[];
function Focultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
        document.getElementById('dniP').addEventListener('input', async function() {
            let inputDniP = this.value;
            if (inputDniP.length === 3) {
                try {
                     aux = await fech(inputDniP, '/buscarPacientes');
                    if (aux) {
                        sugerirPacientes(aux);
                    }
                } catch (error) {
                    console.error('Error fetching pacientes:', error);
                }
            }
        });
        
        async function fech(input, endpoint) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: input
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.text();
                console.log('Success cliente:', data); // Maneja la respuesta del servidor aquí
                return data;
            } catch (error) {
                console.error('Error:', error); // Maneja los errores aquí
                throw error; // Re-lanzar el error para que pueda ser capturado en el bloque catch
            }
        }
        
        function sugerirPacientes(aux) {
            Focultar();
            // Lógica para sugerir pacientes usando la información recibida en aux
            //console.log('Sugerir pacientes con los datos:', aux);
            for(let paciente of aux){
                let input = document.createElement('input');
                input.type = 'text';
                input.value = `${paciente.nombre} ${paciente.apellido}`; // Ajusta esto según las propiedades de los objetos en aux
                
                divPacientes.appendChild(input);
                divPacientes.appendChild(document.createElement('br')); // Añadir un salto de línea entre inputs
            
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