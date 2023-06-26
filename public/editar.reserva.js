// Referencia al formulario
const formEditar = document.querySelector("#formEditar");

// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  const nombre_y_apellido = document.querySelector("#nombre_y_apellido").value;
  const email = document.querySelector("#email").value;
  const lugar_Viaje = document.querySelector("#lugar_viaje").value;
  const fecha = document.querySelector("#fecha").value;
  const estado = document.querySelector("#estado").value;

  const response = await fetch(
    `http://localhost:3000/api/reserva/${formEditar.dataset.id}`
  );

  const data = await response.json();

  console.log(data);

  nombre_y_apellido.value = data.nombre_y_apellido;
  email.value = data.email;
  lugar_Viaje.value = data.lugar_Viaje;
  fecha.value = data.fecha;
  estado.value = data.estado;
});
