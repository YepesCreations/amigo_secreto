let amigos = []; // Lista para almacenar los nombres de los amigos

function agregarAmigo() {
  let input = document.getElementById("amigo");
  let nombre = input.value.trim(); // Elimina espacios en blanco al inicio y final

  // Validaciones
  if (nombre.length < 3 || /^\d/.test(nombre) || !/[a-zA-Z]/.test(nombre)) {
    alert(
      "Por favor, ingrese un nombre válido (mínimo 3 letras, no iniciar con número y debe contener al menos una letra)."
    );
    input.focus(); // Coloca el cursor en el campo de entrada nuevamente
    return; // Sale de la función si el nombre no es válido
  }

  amigos.push(nombre); // Agrega el nombre a la lista
  actualizarLista(); // Refresca la lista en la interfaz
  input.value = ""; // Limpia el campo de texto
  input.focus(); // Vuelve a posicionar el cursor en el campo de entrada
}

function actualizarLista() {
  let lista = document.getElementById("listaAmigos");
  // Convierte el array en una lista de nombres y actualiza el HTML
  lista.innerHTML = amigos
    .map((nombre) => `<span class="nombres">${nombre} </span>`)
    .join("");
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Debe agregar al menos un amigo para hacer el sorteo.");
    return; // Sale de la función si no hay amigos en la lista
  }

  // Selecciona un ganador aleatoriamente de la lista
  let ganador = amigos[Math.floor(Math.random() * amigos.length)];

  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `<p style="font-size: 24px; font-weight: bold; color: #05DF05;">El amigo secreto es: ${ganador}</p>`;

  // Vacía la lista de amigos después del sorteo
  amigos = [];
  actualizarLista();

  // Muestra el botón de reinicio
  mostrarBotonReiniciar();
}

function mostrarBotonReiniciar() {
  let buttonContainer = document.querySelector(".button-container");

  // Verifica si el botón ya existe para no duplicarlo
  if (!document.getElementById("boton-reiniciar")) {
    let nuevoBoton = document.createElement("button");
    nuevoBoton.textContent = "Reiniciar sorteo";
    nuevoBoton.id = "boton-reiniciar"; // Asigna un ID para identificarlo
    nuevoBoton.classList.add("button-reset");
    nuevoBoton.onclick = reiniciarSorteo;

    buttonContainer.appendChild(nuevoBoton); // Agrega el botón a la interfaz
  }
}

function reiniciarSorteo() {
  amigos = []; // Vacía la lista de amigos
  document.getElementById("listaAmigos").innerHTML = ""; // Limpia la lista en la interfaz
  document.getElementById("resultado").innerHTML = ""; // Borra el resultado anterior

  let botonReiniciar = document.getElementById("boton-reiniciar");
  if (botonReiniciar) {
    botonReiniciar.remove(); // Elimina el botón de reinicio si existe
  }

  document.getElementById("amigo").focus(); // Enfoca el campo de entrada para facilitar la reutilización
}

// Espera a que el documento esté completamente cargado antes de asignar eventos
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input-name");
  const addButton = document.querySelector(".button-add");

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que se envíe un formulario si está dentro de uno
      addButton.click(); // Simula el clic en el botón de agregar
    }
  });
});
