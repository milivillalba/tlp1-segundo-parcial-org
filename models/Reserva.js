// TODO: Crear modelo de datos de Reserva

const { sequelize, DataTypes } = require("../db");

const reserva = sequelize.define(
  "reserva",
  {
    // Model attributes are defined here
    nombre_y_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lugar_Viaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    crearNuevaReserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    EditarReserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    EliminarReserva: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    crearNuevaReserva: true,
    EditarReserva: true,
    EliminarReserva: true,
    tableName: "reserva",
  }
);

// Crear tabla si no existe
reserva.sync();

module.exports = reserva;
