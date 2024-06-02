let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let selectSexo=document.getElementById("selectSexo");
let pacientes=[];
let profecional = document.getElementById('app').dataset.profesional;
let paciente;//para la prescripcion
let obraSocialSelec=document.getElementById('obraSP');
let planSelec=document.getElementById('plan');
let obraSocialPlan;//para la prescripcion
let obrass;
let sexo;
inputSexoP=document.getElementById('sexoP');
      
//console.log(`profecional ${profecional}`);
function Focultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
        document.getElementById('dniP').addEventListener('input', async function() {
            eliminarHijos(divPacientes);
            let inputDniP = this.value;
            //console.log(inputDniP);
            if (inputDniP.length === 7||inputDniP.length===8) {
                try {
                   // console.log(`dni antes deir al fetch ${inputDniP}`);
                     pacientes = await fech(inputDniP, '/buscarPacientes');
                    if (pacientes!="") {
                        sugerirPacientes(pacientes);
                    }else{
                        crearPaciente();
                    }
                } catch (error) {
                    console.error('Error fetching pacientes:', error);
                }
            }
        });
function traerObras(){
    fech('*', '/traerObras')
    .then(function(obras) {
        obrass=obras;
        llenarSelecObraS(obras);
        
    }).catch(function(error) {
        console.error("Error al traer las obras:", error);
    });
}

function crearPaciente(){
selectSexo.style.display="block";
traerObras();
traerSexo();//traer todos los sexos para el nuevo pacienta
let p=document.createElement('p');
p.textContent='El paciente no esta registrado,por favor complete los campos y registrelo';
let buton=document.createElement('button');
buton.textContent = 'Registrar';

divPacientes.appendChild(p);
divPacientes.appendChild(buton);
buton.addEventListener('click', (event) => {
 event.preventDefault(); // Evitar el envío del formulario
 registrarPaciente();
});

async function traerSexo(){
    let sexos=await fech('*','sexoTodos');
    //llenar el selec
    //console.log(sexos);
    eliminarHijos(selectSexo);
    let opt=document.createElement('option');
    opt.value=null;
    opt.textContent='Elija un sexo';
    selectSexo.appendChild(opt);
    for(let sexo of sexos){
     let opti=document.createElement('option');
     opti.value=sexo.nombre_sexo;
     opti.textContent=sexo.nombre_sexo;
     selectSexo.appendChild(opti);
    }
    selectSexo.addEventListener('change', async function(event) {
        // 3. Capturar el valor seleccionado
        const valorSeleccionado = event.target.value;
    // Hacer algo con el valor seleccionado (por ejemplo, imprimirlo en la consola)
       // console.log('Valor seleccionado:', valorSeleccionado);
       
    sexo= await sexos.find(se => se.nombre_sexo===valorSeleccionado);
      if(sexo){
        inputSexoP.value=sexo.nombre_sexo;
        inputSexoP.placeholder=sexo.nombre_sexo;
      }else{
        alert('La opcion de sexo ingresada no es valida');
      }  
       

    });
}

} 
function registrarPaciente(){
    console.log(`paciente el funsion registrarPaciente ${paciente}`);
    //hacerel paciente con los datos necesarios para la base de datos
    //hacer el endpoin para cargar el pacienta
    //ejecutar el fech
    //hacer la queri a la base de datos
} 
        async function fech(input, endpoint) {
            try {
                //console.log(`dni en fech ${input}`);
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: input
                });
        
                if (!response.ok) {
                    throw new Error('Error en la respuesta del fetch');
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
 async function asignarPaciente(dniPaciente){
    paciente= pacientes.find(persona => persona.dni === dniPaciente);
    //console.log(`idPaciente en dom ${paciente.idPaciente}`);
        document.getElementById('dniP').value = paciente.dni;
        document.getElementById('nombreP').value = paciente.nombre;
        document.getElementById('apellidoP').value = paciente.apellido;
        document.getElementById('sexoP').value = paciente.sexo;
        document.getElementById('obraSP').value = paciente.obraSocial;
        document.getElementById('plan').value = paciente.plan;
        document.getElementById('fechaNP').value =convertirFechaISOaFechaLocal(paciente.fechaNacimiento) ;
        let obras=  await fech(paciente.idPaciente,'/obraSocialPaciente');
      //console.log(obras);
        llenarSelecObraS(obras,true);
    eliminarHijos(divPacientes);
 }      
 function llenarSelecObraS(obras){
    eliminarHijos(obraSocialSelec);
    let option2 = document.createElement('option');
    option2.value=null;
    option2.textContent='Obra Social';
    obraSocialSelec.appendChild(option2);
    for(let ob of obras){
        let option = document.createElement('option');
        option.value = ob.nombre_obra_social;
        option.textContent = ob.nombre_obra_social;
        obraSocialSelec.appendChild(option);
      }
      llenarO(obras);
 } 
 function llenarO(obras) {
    obraSocialSelec.addEventListener("change", function() {
        console.log(obraSocialSelec.value);
        console.log(obras);

        // Crear una promesa para manejar el filtrado
        let filtrarObras = new Promise((resolve, reject) => {
            // Filtrar las obras
            let planes = obras.filter(ob => ob.nombre_obra_social === obraSocialSelec.value);
            if (planes) {
                resolve(planes); // Resuelve la promesa con los planes filtrados
            } else {
                reject("No se encontraron planes."); // Rechaza la promesa en caso de error
            }
        });

        // Manejar la promesa
        filtrarObras
            .then(planes => {
                llenarPlan(planes); // Ejecutar llenarPlan después de que se resuelva la promesa
            })
            .catch(error => {
                console.error(error); // Manejar errores si los hay
            });
    });
}

// Asegúrate de que las funciones y variables como `llenarPlan` y `obraSocialSelec` estén definidas


 function eliminarHijos(div) {
    
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
 function llenarPlan(planes){
    eliminarHijos(planSelec);
    let option2 = document.createElement('option');
    option2.value=null;
    option2.textContent='PLan';
    planSelec.appendChild(option2);
    for(let pl of planes){
        let option = document.createElement('option');
        option.value = pl.nombre_plan;
        option.textContent = pl.nombre_plan;
        planSelec.appendChild(option);
      }
 }

 planSelec.addEventListener("change",async function(){
    console.log(obrass);
obraSocialPlan=await obrass.find(ob=>ob.nombre_plan===planSelec.value);
//console.log(obraSocialPlan);
 });
selectTipo.addEventListener("change", function() {
        Focultar();
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
         }
    });