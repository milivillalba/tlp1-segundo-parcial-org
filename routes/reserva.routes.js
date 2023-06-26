// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const router = require("express").Router();

const {
  obtenerReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reserva.controllers");

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
// router.get("/usuaris", () => {
//   console.log("holi mili");
// });

router.get("/", (req, res) => {
  res.render("index");
});

// Formulario para crear una reserva
router.get("/crear/resrva", (req, res) => {
  res.render("crear_reserva");
});

// Formulario para actualizar una reserva
router.get("/reserva/editar/:id", (req, res) => {
  res.render("editar_reserva", { id: req.params.id });
});
// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get("/api/reserva", obtenerReservas);

//Obtener una reserva
router.get("/api/reserva/:id", obtenerReserva);

// Crear una reserva
router.post("/api/reserva/:id", crearReserva);

// Actualizar una reserva
router.put("/api/reserva/:id", actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete("/api/reserva/:id", eliminarReserva);

module.exports = router;
