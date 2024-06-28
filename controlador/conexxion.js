
import express, { json } from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from'body-parser';
import{crear,verificarProfecional,traerTodo,crearProfecional,buscarPacientes,busacrObraSocialPaciente,traerObras,sexoTodos,crearPaciente,nombresGenericos,administraciones,traerPrestaciones,todosLados}from './manejadorDeRutas.js'
import { logins } from '../modelo/login.js';
//import { pacientes } from '../modelo/paciente.js';
import { todosSexo } from '../modelo/paciente.js';

let profecionales;
let profecional;
let encabezado;
let mensajeExito;
//let pacientes;
export function traerProfecionl(profecionalI){
  profecional=profecionalI;
}
/*function traerPaciente(pacs){
  pacientes=pacs;
  //console.log(pacientes);
}*/
export function conectar(){
  
const app = express();

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticOptions = {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
};

app.use(express.static(path.join(__dirname, 'estatica'), staticOptions));


//console.log(profecionales);


const port = 3000;
// Configuración del body-parser
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, '..','estatica')));

app.use(express.urlencoded({ extended: true }))
// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..','vistas'));
app.use(express.json());
// Definir una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
   encabezado="Bienvenido al Ministerio de Salud";
    res.render('vistaPrincipal',{encabezado});
  });
  app.post('/verificarProfecional', (req, res) => {
   //console.log(req.body);
   //const loginAux= req.body.idProfecional; 
   verificarProfecional(res,req.body,logins,encabezado);
   //console.log('----------------------');
   //console.log(logins);
  });
  
  app.get('/recetas', (req, res) => {
     encabezado = "Bienvenido al Recetario web Nacional";
     //Nombre, Apellido, documento, profesión, especialidad, domicilio y matrícula del profesional
    //profecional={nombre:"Alejandro",apellido:"Rubira",dni:"26833093",profecion:"medico",especialidad:"cardiologia",domiclio:"Tilisarao",matriculaP:"123"};
   console.log(`profecional ${profecional}`);
    res.render('recetas', { encabezado,profecional }); // Pasar el nombre a la vista
  });
  app.get('/medicos',(req,res)=>{
    encabezado="Planilla para procesar medicos"
    res.render('medicos',{encabezado,mensajeExito});
  });
  app.get('/medicamentos',(req,res)=>{
    res.render('medicamentos',{encabezado,nombre: profecional});
  })
  
app.post('/verificarAdministrativo',(req,res)=>{
      // Obtener el ID del Profesional enviado desde el formulario
    const idProfecional = req.body.idAdministrativo;
    if (idProfecional==="123") {
      encabezado="Planilla de medicamentos";
      profecional="Alejandro";
      // Redirigir al usuario al endpoint '/recetas'
    return res.redirect('/medicamentos');
    }else{
      let alerta=true;
     return res.render('vistaPrincipal',{encabezado,alerta})
    }
   
});
app.post('/verificarAdministrativoR',(req,res)=>{
  // Obtener el ID del Profesional enviado desde el formulario
const idProfecional = req.body.idAdministrativoR;
if (idProfecional==="123") {
   encabezado="Planilla de profecionales";
  profecional="Alejandro";
  // Redirigir al usuario al endpoint 
return res.redirect('/medicos');
}else{
  let alerta=true;
 return res.render('vistaPrincipal',{encabezado,alerta})
}

});         
app.post('/crearProfecional',(req,res)=>{
  crearProfecional(req,res,mensajeExito)
  
});
/*pp.post('/buscarPacientes',(req,res)=>{
// Capturar los tres caracteres enviados como texto
//console.log(pacientes);
const caracteres = req.body;
let pac=buscarPacienteDni(caracteres);
// Puedes procesar los caracteres aquí
//console.log('Caracteres recibidos SERVIDOR:', caracteres);
//let pac= pacientes.filter(paciente => paciente.dni.startsWith(caracteres));
// Enviar una respuesta de vuelta al cliente
//console.log(pac);
res.send(pac);
});*/
app.post('/buscarPacientes', async (req, res) => {
  buscarPacientes(req,res);
 /* try {
      let caracteres = req.body; 
      console.log(caracteres);
      let pac = await buscarPacienteDni(caracteres);
     // console.log(pac);
      res.send(pac);
  } catch (error) {
      console.error('Error al buscar pacientes:', error);
      res.status(500).send('Error interno del servidor');
  }*/
});
app.post('/obraSocialPaciente', async (req, res) => {
  busacrObraSocialPaciente(req,res);
  /*try {
      let caracteres = req.body; 
     // console.log(`idPaciente en ruta ${caracteres}`);
     // console.log(caracteres);
      let obra = await buscarOSIdPaciente(caracteres);
     // console.log(pac);
      res.send(obra);
  } catch (error) {
      console.error('Error al buscar obre sociales:', error);
      res.status(500).send('Error interno del servidor');
  }*/
});
app.post('/traerObras', async (req, res) => {
  traerObras(req,res)
  /*try {
      let caracteres = req.body; 
      //console.log(`caracter en ruta en ruta ${caracteres}`);
     // console.log(caracteres);
      let obras = await todasObras(caracteres);
     // console.log(pac);
      res.send(obras);
  } catch (error) {
      console.error('Error al buscar obras sociales:', error);
      res.status(500).send('Error interno del servidor');
  }*/
});
app.post('/sexoTodos', async (req, res) => {
  sexoTodos(req,res);
  /*try {
      let caracteres = req.body; 
      //console.log(`caracter en ruta en ruta ${caracteres}`);
     // console.log(caracteres);
      let sexos= await todosSexo(caracteres);
     // console.log(pac);
      res.send(sexos);
  } catch (error) {
      console.error('Error al buscar en la tabla sexo:', error);
      res.status(500).send('Error interno del servidor');
  }*/
});
app.post('/generarPaciente',async (req,res)=>{

console.log(req.body);
await crearPaciente(req,res);
//res.send(body);
});
app.post('/nombreGenerico', async (req, res) => {
  nombresGenericos(req,res);
  /*try {
      let caracteres = req.body; 
      //console.log(`caracter en ruta en ruta ${caracteres}`);
     // console.log(caracteres);
      let sexos= await todosSexo(caracteres);
     // console.log(pac);
      res.send(sexos);
  } catch (error) {
      console.error('Error al buscar en la tabla sexo:', error);
      res.status(500).send('Error interno del servidor');
  }*/
});
app.post('/administraciones',async(req,res)=>{
  //console.log(`body en conexxion ${req.body}`);
administraciones(req,res);
});
app.post('/prestaciones',async(req,res)=>{
traerPrestaciones(req,res);
});
app.post('/lados',async (req,res)=>{
todosLados(req,res);
});
app.post('/profeciones',async(req,res)=>{
traerTodo(req,res,"profecion");
});
app.post('/especialidades',async(req,res)=>{
traerTodo(req,res,"especialidad");
});
app.post('/crearMedico',async(req,res) =>{
crear(req,res,"Medico");
})
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
//console.log(profecionales);
}
//export{traerPaciente};

