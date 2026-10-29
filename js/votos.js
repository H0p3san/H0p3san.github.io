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

function mostrar(tarjeta, valor) {
  const contador = tarjeta.querySelector(".contador");
  if (valor === null) {
    contador.textContent = "El oso se fue a almorzar";
  } else {
    contador.innerHTML = "<strong></strong> lo quieren";
    contador.querySelector("strong").textContent = valor;
  }
}

for (const tarjeta of document.querySelectorAll(".producto[data-clave]")) {
  const clave = tarjeta.dataset.clave;
  const boton = tarjeta.querySelector(".boton--votar");

  if (yaVoto(clave)) { boton.disabled = true; boton.textContent = "✔ Anotado"; }

  fetch(`${API}/get/${ESPACIO}/${clave}`, { cache: "no-store" })
    // 404: todavía nadie votó ese mod y su contador no existe.
    .then(r => r.status === 404 ? { value: 0 } : r.ok ? r.json() : Promise.reject(r.status))
    .then(d => mostrar(tarjeta, d.value))
    .catch(() => mostrar(tarjeta, null));

  boton.addEventListener("click", async () => {
    if (boton.disabled) return;
    boton.disabled = true;
    try {
      const r = await fetch(`${API}/hit/${ESPACIO}/${clave}`, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      mostrar(tarjeta, (await r.json()).value);
      anotar(clave);
      boton.textContent = "✔ Anotado";
    } catch {
      boton.disabled = false;
      mostrar(tarjeta, null);
    }
  });
}
