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
ctrlReservas.obtenerReservas = async (req, res) => {
  try {
    const Reserva = await reserva.findAll({
      where: {
        estado: 1,
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
        id: id,
      },
    });

    if (!personas) {
      throw {
        status: 404,
        message: "No existe la personas",
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
  const { id, nombre_y_apellido, email, lugar_Viaje, fecha, estado } = req.body;

  try {
    const Reserva = await reserva.create({
      id,
      nombre_y_apellido,
      email,
      lugar_Viaje,
      fecha,
      estado,
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
  const { email, lugar_Viaje } = req.body;

  try {
    const reservaActualizada = await reserva.update(
      {
        email,
        lugar_Viaje,
      },
      {
        where: {
          id,
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
        estado: false,
      },
      {
        where: {
          id,
          estado: true,
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
