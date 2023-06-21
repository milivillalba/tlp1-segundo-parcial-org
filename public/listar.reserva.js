const { obtenerReservas } = require("../controllers/reserva.controllers");

const listadoReserva = document.querySelector("#listadoTareas");

const obtenerReserva = async () => {
  const res = await fetch("http://localhost:4000/api/reserva", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (res.status === 404) {
    return [];
  }

  const data = await res.json();
  return data;
};

const eliminarReserva = async (event) => {
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:4000/api/reserva/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log(data);

    Swal.fire({
      icon: "success",
      title: "reserva eliminada",
      text: data.message,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2200);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

const mostrarReserva = (reserva) => {
  // Si no hay reserva, mostrar un mensaje
  if (tareas.length === 0) {
    listadoReserva.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay reserva registradas</td>
            </tr>
        `;
    return;
  }

  reserva.forEach((reserva) => {
    listadoReserva.innerHTML += `
                    <tr>
                        <td>${reserva.nombre_y_apellido}</td>
                        <td>${reserva.lugar_viaje}</td>
                        <td>
                            <button onclick=eliminarTarea(event) class="btn btn-danger btn-sm" data-id="${reserva.id}">Eliminar</button>
                            <a href="/reserva/editar/${reserva.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
  });
};

// Obtener las reserva automáticamente cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  // Dentro de try se coloca el código que se quiere ejecutar
  try {
    const reserva = await obtenerReservas();
    mostrarReservas(reserva);
  } catch (error) {
    // Dentro de catch se coloca el código que se ejecutará en caso de que haya un error
    console.log({ error });

    // Mensaje para el usuario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
