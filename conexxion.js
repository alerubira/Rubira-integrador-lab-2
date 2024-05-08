
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from'body-parser';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function conectar(){
const app = express();
const port = 3000;
// Configuración del body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, 'estatica')));

// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'estatica'));

// Definir una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
  let encabezado="Bienvenido al Ministerio de Salud";
    res.render('vistaPrincipal',{encabezado});
  });
app.post('/verificarProfecional',(req,res)=>{
    // Obtener el ID del Profesional enviado desde el formulario
      const idProfesional = req.body.idProfesional;
      console.log(idProfesional);
});
app.post('/verificarAdministrativo',(req,res)=>{

});
app.get('/recetas',(req,res)=>{
  let encabezado="Bienvenido al Recetario web Nacional";

    res.render('recetas',{encabezado})
});
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
}


