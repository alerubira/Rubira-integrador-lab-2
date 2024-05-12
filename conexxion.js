
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from'body-parser';
import{verificarProfecional}from './manejadorDeRutas.js'

let profecional;
let encabezado;
export function traerProfecionl(profecionalI){
  profecional=profecionalI;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function conectar(){
const app = express();
const port = 3000;
// Configuración del body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, 'estatica')));
app.use(express.urlencoded({ extended: true }))
// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'estatica'));

// Definir una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
   encabezado="Bienvenido al Ministerio de Salud";
    res.render('vistaPrincipal',{encabezado});
  });
  app.post('/verificarProfecional', (req, res) => {
   // Obtener el ID del Profesional enviado desde el formulario
const idProfecional = req.body.idProfecional; 
   verificarProfecional(res,idProfecional,encabezado);
   
  });
  
  app.get('/recetas', (req, res) => {
     encabezado = "Bienvenido al Recetario web Nacional";
     //Nombre, Apellido, documento, profesión, especialidad, domicilio y matrícula del profesional
    //profecional={nombre:"Alejandro",apellido:"Rubira",dni:"26833093",profecion:"medico",especialidad:"cardiologia",domiclio:"Tilisarao",matriculaP:"123"};
   // console.log(profecional);
    res.render('recetas', { encabezado,profecional }); // Pasar el nombre a la vista
  });
  app.get('/medicos',(req,res)=>{
    res.render('medicos',{encabezado,nombre: profecional});
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

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
}


