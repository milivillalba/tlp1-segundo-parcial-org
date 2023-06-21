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

router.get("/reservas", (req, res) => {
  res.render("reserva/index");
});

// Formulario para crear una reserva
router.get("/reserva/editar/:id", (req, res) => {
  const tareaId = req.params.id;
  res.render("reserva/editar_reserva", { id: reservaId });
});

// Formulario para actualizar una reserva
router.get("/reserva/crear", (req, res) => {
  res.render("reserva/crear_reserva");
});
// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get("/api/reserva", obtenerReservas);

// Crear una reserva
router.post("/api/reserva/:id", crearReserva);

// Actualizar una reserva
router.put("/api/reserva/:id", actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete("/api/reserva/:id", eliminarReserva);

module.exports = router;
