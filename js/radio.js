// La radio del bazar: apagada de entrada (los navegadores no dejan que el audio arranque solo), se prende y se apaga con
// el botón de la cabecera. Pasa los temas uno detrás del otro y vuelve a empezar; mientras suena, de la radio salen notas.
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

function mostrar(sonando) {
  perilla.setAttribute("aria-pressed", sonando ? "true" : "false");
  texto.textContent = sonando ? TEMAS[actual].nombre : "Radio del bazar";
  perilla.title = sonando ? "Apagar la radio" : "Prender la radio";
  clearInterval(chispero);
  chispero = sonando && !quieto.matches ? setInterval(soltarParticula, 420) : null;
}

// Terminó un tema: el siguiente (y después del último, el primero).
radio.addEventListener("ended", () => {
  actual = (actual + 1) % TEMAS.length;
  radio.src = TEMAS[actual].archivo;
  radio.play().catch(() => mostrar(false));
});
// El botón sigue al audio aunque se pause por otro lado (auriculares, teclas multimedia).
radio.addEventListener("pause", () => { if (!radio.ended) mostrar(false); });
radio.addEventListener("play", () => mostrar(true));

perilla.addEventListener("click", async () => {
  if (radio.paused) {
    try {
      await radio.play();
    } catch {
      mostrar(false);
    }
  } else {
    radio.pause();
  }
});
