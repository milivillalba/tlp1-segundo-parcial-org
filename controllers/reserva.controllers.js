const reserva = require("../models/Reserva");

const ctrlReservas = {};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
// Obtener una reserva
// Crear una reserva
// Actualizar una reserva
// Eliminar una reserva de forma lógica

// Ctrl para obtener todas las reservas
ctrlReservas.obtenerReserva = async (req, res) => {
  try {
    const Reserva = await reserva.findAll({
      where: {
        nombre_y_apellido: req.Reserva.nombre_y_apellido,
        usuarioId: req.usuario.id,
      },
    });

    if (!Reserva || Reserva.length === 0) {
      throw {
        status: 404,
        message: "No hay Reservas registradas",
      };
    }

    return res.json(Reserva);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
};

// Ctrl para obtener una reserva
ctrlReservas.obtenerReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const Reserva = await reserva.findOne({
      where: {
        id,
        nombre_y_apellido: req.Reserva.nombre_y_apellido,
      },
    });

    if (!Reserva) {
      throw {
        status: 404,
        message: "No existe la reserva",
      };
    }

    return res.json(Reserva);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Ctrl para crear una Reserva
ctrlReservas.crearReserva = async (req, res) => {
  const { nombre_y_apellido, lugar_Viaje } = req.body;

  try {
    const Reserva = await reserva.create({
      nombre_y_apellido,
      lugar_Viaje,
      usuarioId: req.usuario.id,
    });

    if (!Reserva) {
      throw {
        status: 400,
        message: "No se pudo crear la Reserva",
      };
    }

    return res.json(Reserva);
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Ctrl para actualizar una reserva
ctrlReservas.actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { nombre_y_apellido, lugar_Viaje } = req.body;

  try {
    const reservaActualizada = await reserva.update(
      {
        nombre_y_apellido,
        lugar_Viaje,
      },
      {
        where: {
          id,
          nombre_y_apellido: req.Reserva.nombre_y_apellido,
        },
      }
    );

    if (!reservaActualizada) {
      throw {
        status: 400,
        message: "No se pudo actualizar la Reserva",
      };
    }

    return res.json({
      message: "Reserva actualizada correctamente",
      reservaActualizada,
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Ctrl para eliminar una reserva
ctrlReservas.eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaEliminada = await reserva.update(
      {
        nombre_y_apellido: req.Reserva.nombre_y_apellido,
      },
      {
        where: {
          id,
          nombre_y_apellido: req.Reserva.nombre_y_apellido,
        },
      }
    );

    if (!reservaEliminada) {
      throw {
        status: 400,
        message: "No se pudo eliminar la Reserva",
      };
    }

    return res.json({
      reservaEliminada,
      message: "Reserva eliminada correctamente",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = ctrlReservas;
