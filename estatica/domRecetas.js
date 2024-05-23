let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let pacientes=[];
let profecional = document.getElementById('app').dataset.profesional;
let paciente;
      
//console.log(`profecional ${profecional}`);
function Focultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
        document.getElementById('dniP').addEventListener('input', async function() {
            let inputDniP = this.value;
            if (inputDniP.length === 7) {
                try {
                     pacientes = await fech(inputDniP, '/buscarPacientes');
                    if (pacientes) {
                        
                        sugerirPacientes(pacientes);
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
                const data = await response.json(); // Cambiado a .json() para manejar respuestas JSON
                //const data = await response.text();
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
                //console.log(paciente.nombre);
               // Agregar contenido al label
               let div = document.createElement('div');
               div.className = 'div'; // Agrega la clase 'mi-clase' al div
               // Crear y agregar label para DNI
               let labelDni = document.createElement('label');
               labelDni.className=('label');
               labelDni.textContent = paciente.dni;
               labelDni.htmlFor = 'dniP';
               div.appendChild(labelDni);
               
               // Crear y agregar label para Nombre
               let labelNombre = document.createElement('label');
               labelNombre.className=('label');
               labelNombre.textContent = paciente.nombre;
               labelNombre.htmlFor = 'nombreP';
               div.appendChild(labelNombre);
               
               // Crear y agregar label para Apellido
               let labelApellido = document.createElement('label');
               labelApellido.className=('label');
               labelApellido.textContent = paciente.apellido;
               labelApellido.htmlFor = 'apellidoP';
               div.appendChild(labelApellido);
               
               // Crear y agregar el botón
               let buton = document.createElement('button');
               buton.textContent = 'Agregar';
               buton.addEventListener('click', (event) => {
                event.preventDefault(); // Evitar el envío del formulario
                asignarPaciente(paciente.dni);
            });
               div.appendChild(buton);
               
               // Agregar el div al contenedor principal
               divPacientes.appendChild(div);
               
                divPacientes.appendChild(document.createElement('br')); // Añadir un salto de línea entre inputs
            
            }
               
        }
function convertirFechaISOaFechaLocal(fechaISO) {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade ceros a la izquierda
    const day = ('0' + fecha.getDate()).slice(-2); // Añade ceros a la izquierda
    return `${year}-${month}-${day}`;
}
 function asignarPaciente(dniPaciente){
    paciente= pacientes.find(persona => persona.dni === dniPaciente);
        document.getElementById('dniP').value = paciente.dni;
        document.getElementById('nombreP').value = paciente.nombre;
        document.getElementById('apellidoP').value = paciente.apellido;
        document.getElementById('sexoP').value = paciente.sexo;
        document.getElementById('obraSP').value = paciente.obraSocial;
        document.getElementById('plan').value = paciente.plan;
        document.getElementById('fechaNP').value =convertirFechaISOaFechaLocal(paciente.fechaNacimiento) ;
 }       
selectTipo.addEventListener("change", function() {
        Focultar();
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
         }
    });