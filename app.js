// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
// Si no existe el archivo .env, el valor por defecto del puerto será 6000
const port = process.env.PORT || 4000;
require("ejs");

const app = express();

// Configuración de motor de plantillas EJS
app.set("view engine", "ejs");

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require("./db");

//Se ejecuta una instancia de conexión a la base de datos

sequelize
  .authenticate()
  .then(() => console.log("Conexión a base de datos exitosa"))
  .catch((error) => console.log("Error al conectar a base de datos", error));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/reserva.routes"));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
  res.write(`<div>
          <h1>404 - Ruta no encontrada</h1>
          <hr>
          <p>La pagina que intentas buscar no existe</p>
          <p>Redireccionando a la página de inicio...</p>
          <script>
          (
            () => setTimeout(() => {
              window.location.href='http://localhost:${port}/reserva';
             }, 4000)
          )();
          </script>
      </h1>`);
});

// Servidor en escucha de peticiones
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));
