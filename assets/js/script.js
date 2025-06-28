// Carrusel automático
const carouselElement = document.querySelector('#carouselExample');
if (carouselElement) {
  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 5000,
    ride: 'carousel',
    wrap: true,
    pause: false
  });
}
// Arreglo de temas de ciberseguridad - Se utiliza base de Tarea 4
  const temas = [
  {
    id: "phishing",
    nombre: "Phishing",
    imagen: "../img/phishing.jpg",
    caracteristicas: "Engaño para obtener información confidencial haciéndose pasar por una entidad de confianza.",
  },
  {
    id: "malware",
    nombre: "Malware",
    imagen: "../img/malware.jpg",
    caracteristicas: "Software malicioso que daña, roba información o toma control de dispositivos sin permiso.",
  },
  {
    id: "ransomware",
    nombre: "Ransomware",
    imagen: "../img/ransomware.jpg",
    caracteristicas: "Secuestra archivos o sistemas y exige un pago para liberarlos.",
  },
  {
    id: "ingenieria-social",
    nombre: "Ingeniería Social",
    imagen: "../img/ingenieria-social.jpg",
    caracteristicas: "Manipulación psicológica para que una persona revele información confidencial.",
  },
  {
    id: "spyware",
    nombre: "Spyware",
    imagen: "../img/spyware.jpg",
    caracteristicas: "Software que recopila información del usuario sin su conocimiento.",
  },
  {
    id: "keylogger",
    nombre: "Keylogger",
    imagen: "../img/keylogger.jpg",
    caracteristicas: "Programa que registra las teclas pulsadas para robar contraseñas o información.",
  },
  {
    id: "fuerza-bruta",
    nombre: "Ataque de Fuerza Bruta",
    imagen: "../img/fuerza-bruta.jpg",
    caracteristicas: "Intentos repetidos de adivinar contraseñas hasta encontrar la correcta.",
  },
  {
    id: "spoofing",
    nombre: "Spoofing",
    imagen: "../img/spoofing.jpg",
    caracteristicas: "Suplantación de identidad para engañar sistemas o usuarios.",
  },
  {
    id: "sql-injection",
    nombre: "SQL Injection",
    imagen: "../img/sql-injection.jpg",
    caracteristicas: "Inyección de código malicioso en bases de datos para obtener información o manipular datos.",
  }
];
// Inyectar imágenes del arreglo en el HTML
$(document).ready(function () {
  const $contenedor = $(".contenedor-imagenes");

  temas.forEach((tema, index) => {
    const imagenHTML = `
      <div class="contenedor-imagen">
        <img 
          class="imagen" 
          src="${tema.imagen}" 
          alt="${tema.nombre}" 
          data-index="${index}" 
        >
      </div>
    `;
    $contenedor.append(imagenHTML);
  });
});
// Creación de modal
let currentIndex = 0;

function openModal(index) {
  const tema = temas[index];
  currentIndex = index;

  $("#modal-img").attr("src", tema.imagen);
  $("#modal-img").attr("alt", tema.nombre);
  $("#modal-titulo").text(tema.nombre);
  $("#modal-desc").text(tema.caracteristicas);
  $("#modal-link").html(`
  <a href="https://es.malwarebytes.com/" target="_blank" rel="noopener noreferrer" class="modal-btn-link">
    Protégete ahora
  </a>
`);
// Animación de modal
  $("#modal-overlay").fadeIn(300);
  $("#modal-overlay").css("display", "flex");
}
// Funcionalidad de modal
function cerrarModal() {
  $("#modal-overlay").fadeOut(200);
}
function mostrarSig() {
  currentIndex = (currentIndex + 1) % temas.length;
  openModal(currentIndex);
}
function mostrarPrev() {
  currentIndex = (currentIndex - 1 + temas.length) % temas.length;
  openModal(currentIndex);
}
$(document).ready(function () {
  $(".contenedor-imagenes").on("click", ".imagen", function () {
    const index = $(this).data("index");
    openModal(index);
  });
// Botones siguiente-previo
  $(".modal-sig").on("click", mostrarSig);
  $(".modal-prev").on("click", mostrarPrev);
// Botón cerrar modal
  $("#modal-overlay").on("click", function (e) {
    if ($(e.target).is("#modal-overlay") || $(e.target).is(".modal-cerrar")) {
      cerrarModal();
    }
  });
});
// Formulario de contacto
$(document).ready(function () {
  // Validación de formulario de contacto
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let message = $("#message").val().trim();
    let feedback = $("#formFeedback");

    if (name === "" || email === "" || message === "") {
      feedback.text("Por favor completa todos los campos.").css("color", "red");
    } else if (!validateEmail(email)) {
      feedback.text("Por favor ingresa un correo válido.").css("color", "red");
    } else {
      feedback.text("¡Mensaje enviado correctamente! Te contactaremos pronto.").css("color", "green");
      $(this)[0].reset();
    }
  });
// Validación de email
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
// Validación de test de seguridad
  $("#testForm").on("submit", function (e) {
    e.preventDefault();
    let q1 = $("#question1").val();
    let q2 = $("#question2").val();
    let feedback = $("#testFeedback");

    if (q1 === "" || q2 === "") {
      feedback.text("Por favor responde todas las preguntas.").css("color", "red");
    } else {
      let score = 0;
      if (q1 === "b") score++;
      if (q2 === "b") score++;

      if (score === 2) {
        feedback.text("¡Excelente! Tienes buenos conocimientos de seguridad.").css("color", "green");
      } else if (score === 1) {
        feedback.text("Bien, pero puedes mejorar tus conocimientos de seguridad.").css("color", "orange");
      } else {
        feedback.text("Te recomendamos estudiar más sobre ciberseguridad.").css("color", "red");
      }
    }
  });
});
