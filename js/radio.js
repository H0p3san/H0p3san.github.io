// La radio del bazar: apagada de entrada (los navegadores no dejan que el audio arranque solo), se prende y se apaga con
// el botón de la cabecera y suena en loop.
const radio = document.getElementById("radio");
const perilla = document.querySelector(".boton--radio");
radio.volume = 0.4;

function mostrar(sonando) {
  if (perilla.classList.contains("sin-tema")) return;   // "Radio en camino" manda
  perilla.setAttribute("aria-pressed", sonando ? "true" : "false");
  perilla.textContent = sonando ? "⏸ Apagar la radio" : "📻 Radio del bazar";
}

// Sin el tema en musica/ (todavía no se subió): el botón avisa y no hace nada.
function sinTema() {
  radio.pause();
  perilla.classList.add("sin-tema");
  perilla.setAttribute("aria-pressed", "false");
  perilla.textContent = "📻 Radio en camino";
  perilla.setAttribute("aria-disabled", "true");
}
radio.addEventListener("error", sinTema);
fetch(radio.getAttribute("src"), { method: "HEAD" })
  .then(r => { if (!r.ok) sinTema(); })
  .catch(sinTema);
// El botón sigue al audio aunque se pause por otro lado (auriculares, teclas multimedia).
radio.addEventListener("pause", () => mostrar(false));
radio.addEventListener("play", () => mostrar(true));

perilla.addEventListener("click", async () => {
  if (perilla.classList.contains("sin-tema")) return;
  if (radio.paused) {
    try {
      await radio.play();
      mostrar(true);
    } catch {
      mostrar(false);
    }
  } else {
    radio.pause();
    mostrar(false);
  }
});
