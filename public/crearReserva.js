const formNuevaReserva = document.querySelector("#formNuevaReserva");

formNuevaReserva.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Se obtienen los valores de cada input
  const nombre_y_apellido = document.querySelector("#nombre_y_apellido").value;
  const email = document.querySelector("#email").value;
  const lugar_Viaje = document.querySelector("#lugar_viaje").value;
  const fecha = document.querySelector("#fecha").value;
  const estado = document.querySelector("#estado").value;

  // Se crea un objeto con los valores de los inputs
  const nuevaReserva = {
    nombre_y_apellido,
    email,
    lugar_viaje,
    fecha,
    estado,
  };

  // Se envia la peticion POST
  try {
    const res = await fetch("http://localhost:4000/api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaReserva),
    });

    if (res.status === 400) {
      throw {
        status: 400,
        message: "Todos los campos son obligatorios",
      };
    }

    if (res.status === 500) {
      throw {
        status: 500,
        message: "Error en el servidor",
      };
    }

    const data = await res.json();
    console.log({ data });
    formNuevaReserva.reset();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
});
