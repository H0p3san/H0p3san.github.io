// Los votos de "Próximamente en el bazar": un contador público gratis (Abacus) por mod.
// shortcut: cualquiera que lea este código puede sumar votos llamando a la API; si la votación se pone seria, pasar a
// un contador propio (Cloudflare Workers + KV) que limite por conexión.
const API = "https://abacus.jasoncameron.dev";
const ESPACIO = "hopesan-bazar";

// Un voto por mod por navegador. Si el navegador no deja guardar (modo privado), se puede votar igual.
function yaVoto(clave) {
  try { return localStorage.getItem("voto-" + clave) === "1"; } catch { return false; }
}
function anotar(clave) {
  try { localStorage.setItem("voto-" + clave, "1"); } catch { /* sin almacenamiento: no pasa nada */ }
}

// El último valor de cada tarjeta, para volver a escribirlo al cambiar de idioma.
const valores = new Map();

function mostrarVotos(tarjeta, valor) {
  valores.set(tarjeta, valor);
  const contador = tarjeta.querySelector(".contador");
  if (valor === null) {
    contador.textContent = frase("almuerzo");
  } else {
    contador.innerHTML = `<strong></strong> ${frase("quieren")}`;
    contador.querySelector("strong").textContent = valor;
  }
  const boton = tarjeta.querySelector(".boton--votar");
  if (boton.disabled && yaVoto(tarjeta.dataset.clave)) boton.textContent = frase("anotado");
}

document.addEventListener("idioma", () => {
  for (const [tarjeta, valor] of valores) mostrarVotos(tarjeta, valor);
});

for (const tarjeta of document.querySelectorAll(".producto[data-clave]")) {
  const clave = tarjeta.dataset.clave;
  const boton = tarjeta.querySelector(".boton--votar");

  if (yaVoto(clave)) { boton.disabled = true; boton.textContent = frase("anotado"); }
  mostrarVotos(tarjeta, "…");   // mientras carga, ya en el idioma elegido

  fetch(`${API}/get/${ESPACIO}/${clave}`, { cache: "no-store" })
    // 404: todavía nadie votó ese mod y su contador no existe.
    .then(r => r.status === 404 ? { value: 0 } : r.ok ? r.json() : Promise.reject(r.status))
    .then(d => mostrarVotos(tarjeta, d.value))
    .catch(() => mostrarVotos(tarjeta, null));

  boton.addEventListener("click", async () => {
    if (boton.disabled) return;
    boton.disabled = true;
    try {
      const r = await fetch(`${API}/hit/${ESPACIO}/${clave}`, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      mostrarVotos(tarjeta, (await r.json()).value);
      anotar(clave);
      boton.textContent = frase("anotado");
    } catch {
      boton.disabled = false;
      mostrarVotos(tarjeta, null);
    }
  });
}
