
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, 'publica')));

// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
function conectar(){
// Definir una ruta para renderizar una vista Pug
app.get('/', (req, res) => {
    res.render('vistaPrincipal', { title: 'Hola Mundo' });
  });
  
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
}
export { conectar };

