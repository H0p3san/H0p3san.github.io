// La radio del bazar: apagada de entrada (los navegadores no dejan que el audio arranque solo), se prende y se apaga con
// el botón de la cabecera. Pasa los temas uno detrás del otro y vuelve a empezar.
const TEMAS = [
  { archivo: "musica/hopes-bazaar.mp3", nombre: "Hope’s Bazaar" },
  { archivo: "musica/workshop-stomp.mp3", nombre: "Workshop Stomp" },
];
const radio = document.getElementById("radio");
const perilla = document.querySelector(".boton--radio");
let actual = 0;
radio.volume = 0.4;
radio.src = TEMAS[actual].archivo;

function mostrar(sonando) {
  perilla.setAttribute("aria-pressed", sonando ? "true" : "false");
  perilla.textContent = sonando ? `⏸ ${TEMAS[actual].nombre}` : "📻 Radio del bazar";
  perilla.title = sonando ? "Apagar la radio" : "Prender la radio";
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
