// Tomamos el formulario y el mensaje
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

// Escuchamos el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita que recargue la página

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  // Validación básica
  if (nombre === "" || email === "" || mensaje === "") {
    message.textContent = "Todos los campos son obligatorios";
    message.style.color = "#e53935";
    return;
  }

  // Validación simple de email
  if (!email.includes("@")) {
    message.textContent = "Ingresá un email válido";
    message.style.color = "#e53935";
    return;
  }

  // Simulación de envío exitoso
  message.textContent = "Mensaje enviado correctamente ✔";
  message.style.color = "#4caf50";

  // Limpiar formulario
  form.reset();
});

