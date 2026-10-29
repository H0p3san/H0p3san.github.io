// La radio del bazar: apagada de entrada (los navegadores no dejan que el audio arranque solo), se prende y se apaga con
// el botón de la cabecera. Cada click pasa al siguiente: tema 1, tema 2, apagado (2026-10-29, "se puede ir ciclando por los
// temas con click?"). Si un tema termina solo, sigue el próximo. Mientras suena, de la radio salen notas.
const TEMAS = [
  { archivo: "musica/hopes-bazaar.mp3", nombre: "Hope’s Bazaar" },
  { archivo: "musica/workshop-stomp.mp3", nombre: "Workshop Stomp" },
];
const PARTICULAS = ["img/nota-roja.webp", "img/nota-naranja.webp", "img/nota-azul.webp", "img/destello.webp"];
const radio = document.getElementById("radio");
const perilla = document.querySelector(".boton--radio");
const texto = perilla.querySelector(".boton--radio__texto");
const quieto = matchMedia("(prefers-reduced-motion: reduce)");
let actual = 0;
let chispero = null;
radio.volume = 0.4;
radio.src = TEMAS[actual].archivo;

// Una nota o un destello que sale de la radio, sube torcido y se desvanece.
function soltarParticula() {
  const p = document.createElement("img");
  p.className = "particula";
  p.src = PARTICULAS[Math.floor(Math.random() * PARTICULAS.length)];
  p.alt = "";
  p.style.setProperty("--dx", `${Math.round(Math.random() * 60 - 30)}px`);
  p.style.setProperty("--giro", `${Math.round(Math.random() * 60 - 30)}deg`);
  p.addEventListener("animationend", () => p.remove());
  perilla.appendChild(p);
}

// Nombres propios (mostrarRadio, mostrarVotos): los scripts comparten el espacio global y una "mostrar" pisaba a la otra.
function mostrarRadio(sonando) {
  perilla.setAttribute("aria-pressed", sonando ? "true" : "false");
  texto.textContent = sonando ? TEMAS[actual].nombre : frase("radio");
  perilla.title = frase(!sonando ? "prender" : actual < TEMAS.length - 1 ? "siguiente" : "apagar");
  clearInterval(chispero);
  chispero = sonando && !quieto.matches ? setInterval(soltarParticula, 420) : null;
}

// Terminó un tema: el siguiente (y después del último, el primero).
radio.addEventListener("ended", () => poner((actual + 1) % TEMAS.length));
// El botón sigue al audio aunque se pause por otro lado (auriculares, teclas multimedia).
radio.addEventListener("pause", () => { if (!radio.ended) mostrarRadio(false); });
radio.addEventListener("play", () => mostrarRadio(true));
document.addEventListener("idioma", () => mostrarRadio(!radio.paused));

function poner(i) {
  actual = i;
  radio.src = TEMAS[actual].archivo;
  radio.play().catch(() => mostrarRadio(false));
}

perilla.addEventListener("click", () => {
  if (radio.paused) poner(0);                                   // apagada: arranca por el primero
  else if (actual < TEMAS.length - 1) poner(actual + 1);        // sonando: el siguiente
  else radio.pause();                                           // el último: se apaga
});

mostrarRadio(false);   // el texto del botón en el idioma elegido
