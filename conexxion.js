
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function conectar(){
const app = express();
const port = 3000;


// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, 'estatica')));

// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'estatica'));

// Definir una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
    res.render('vistaPrincipal.pug');
  });
app.grt('/recetas',(req,res)=>{

});
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
}


