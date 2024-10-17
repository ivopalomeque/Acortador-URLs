const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

app.use(expres.static('web'))
// Importar rutas (a implementar por el alumno)
const urlRoutes = require('./routes/urls');
app.use('/', urlRoutes);

// Inicializar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
