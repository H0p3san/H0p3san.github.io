// El idioma del sitio (2026-10-29, "como funcionaria la pagina en ingles?"): el español está en el HTML; acá está el
// inglés de cada elemento con data-i18n. El botón ES · EN de la cabecera cambia y lo recuerda; la primera vez se elige
// según el idioma del navegador (español si empieza con "es", inglés si no).
const INGLES = {
  "t0": "✦ The bazaar is open",
  "t1": "No obligation to buy",
  "t2": "Go home with a mod",
  "t3": "Vote",
  "t4": "Bazaar radio",
  "t5": "Staffed by its own bear* 👑",
  "t6": "You came for a mod.<br>You stayed for the <span class=\"subrayado\">lore</span>.",
  "t7": "Browse the inventory →",
  "t8": "Ask something on Discord",
  "t9": "Works on my machine ☺",
  "t10": "We don't sell smoke*",
  "t11": "*sometimes particles",
  "t12": "Fresh out of the oven ♨",
  "t13": "On display",
  "t14": "Minecraft clothes you wear on your body, in layers. Cut them, dye them, print photos on them and stick bows on them.",
  "t15": "T-shirts, hoodies, skirts, capes, hats, boots and more.",
  "t16": "Seven machines: Modeling Table, Dye Station, Heat Press, Stylist, Loom, Wardrobe and Mannequin.",
  "t17": "Patterns, animal prints, photos and 3D appliqués.",
  "t18": "<span>Price:</span> free <small>(for real)</small>",
  "t19": "Modrinth · soon",
  "t20": "CurseForge · soon",
  "t21": "☕ Buy me a coffee",
  "t22": "Designed by a human, made with AI.",
  "t23": "Coming soon to the bazaar 📦",
  "t24": "Goods in transit. Some are already in the warehouse, others are still in the container, and one has no paperwork. Vote for the one you want unloaded first.",
  "t25": "Votes audited by nobody ☺",
  "t26": "🚚 Shipping time is the effort: slower shipping, more work*. 🏷️ The tag says where the goods are.",
  "t27": "*not a real ETA btw",
  "t28": "Just arrived",
  "t29": "No paperwork",
  "t30": "In the warehouse",
  "t31": "Coming by container",
  "t32": "Coming by container, in parts",
  "t33": "Price: free",
  "t34": "Shipping: arrives tomorrow",
  "t35": "Shipping: 3–5 business days",
  "t36": "Shipping: standard",
  "t37": "Shipping: standard, if it clears customs",
  "t38": "Shipping: slow",
  "t39": "Shipping: by ship",
  "t40": "Shipping: by ship, in four containers",
  "t41": "👍 I want it",
  "t42": "An editor for animated faces for your character.",
  "t43": "Build your face in layers: shape, background, eyes and mouth, with eyes you can tweak in shape and expression.",
  "t44": "Save up to nine expressions and switch between them in a flash with a wheel (F9); the mouth and eyes animate.",
  "t45": "Your face shows on different displays: a CRT screen, LED, LCD, hologram, a cardboard box or a paper bag, with static and interference effects.",
  "t46": "Almost on display.",
  "t47": "Titles",
  "t48": "Titles and honors to show off on the server.",
  "t49": "Earn titles for achievements, or get them handed to you.",
  "t50": "They show up next to your name.",
  "t51": "They recognize your unique talent and give you a buff that matches it.",
  "t52": "So everyone knows who won.",
  "t53": "Mate, with all its ritual, inside Minecraft.",
  "t54": "Grow yerba and craft the gourd, the bombilla and the thermos.",
  "t55": "Brew it slowly: add the yerba, pour the water and drink round after round until it goes flat.",
  "t56": "Different kinds of mate, each with its own effects.",
  "t57": "Built to get along with Farmer&#x27;s Delight.",
  "t58": "Looks That Kill",
  "t59": "Auras triggered by a stare: you can have them, or a mob can hit you with one.",
  "t60": "Stare at a mob and hit it with an aura: a damage one to hurt it, or a buff one to heal or power yourself up.",
  "t61": "Some mobs have their own stare too: if they look at you, it affects you, so better not to meet their eyes.",
  "t62": "For example, a Medusa stare that slowly turns whoever it looks at into stone, mob or player.",
  "t63": "Like Medusa, but with more ethics.",
  "t64": "Tools to study a biome and recreate it somewhere else.",
  "t65": "An analyzer that scans an area and reads its terrain, vegetation and climate.",
  "t66": "Save all that as a pattern.",
  "t67": "A terraformer that applies the pattern to other land, slowly and expensively, so it doesn&#x27;t replace building by hand.",
  "t68": "Reshape the landscape without a shovel.",
  "t69": "A console to run and direct live events on your server.",
  "t70": "Set up arenas that save and restore themselves when it&#x27;s over, and players sign up with /join.",
  "t71": "Action sequences (teleports, commands, spawns and scene changes) that fire in order or when a condition is met. Music, lights and effects come later.",
  "t72": "During the event, run everything from a quick button panel: freeze players, summon, change the weather and pick winners.",
  "t73": "Formerly known as Stage Manager.",
  "t74": "Experimental biology: extract mob DNA and turn into them.",
  "t75": "Take samples with a syringe, analyze them and transform into the creature, with its size, the way it moves and its abilities.",
  "t76": "Arrives in four stages: transforming; diseases and contagion, like the Z Virus; selective breeding and clones; and chimeras that mix species.",
  "t77": "Plus Mimics: creatures that disguise themselves as objects and hunt you.",
  "t78": "Order it well in advance.",
  "t79": "Got a better idea? Bring it to Discord. We&#x27;ll figure out the criteria later.",
  "t80": "Suggest a mod on Discord",
  "t81": "Thanks, suppliers 💛",
  "t82": "Roger and Sosbaldo",
  "t83": "They backed the AI: they paid for part of the AI used to make ModaMod.",
  "t84": "<a href=\"https://www.twitch.tv/rozsier\">Rozsier</a> and Galvhiar",
  "t85": "They made room for the human: they opened their server for me to experiment.",
  "t86": "Thank you for making it possible!",
  "t87": "I don&#x27;t know what I&#x27;m doing, but look how <span class=\"subrayado\">pretty</span>.",
  "t88": "Join the chaos →",
  "t89": "Designed by a human, made with AI and staffed by its own bear. Radio music: made with Suno. © 2026 H0p3san · ModaMod is MIT."
};

// Los textos que arman los scripts (votos y radio), en los dos idiomas.
const FRASES = {
  es: { quieren: "lo quieren", anotado: "✔ Anotado", almuerzo: "El oso se fue a almorzar", radio: "Radio del bazar",
        prender: "Prender la radio", siguiente: "Siguiente tema", apagar: "Apagar la radio",
        boton: "EN", botonTitulo: "Switch to English" },
  en: { quieren: "want it", anotado: "✔ Counted", almuerzo: "The bear went out for lunch", radio: "Bazaar radio",
        prender: "Turn the radio on", siguiente: "Next track", apagar: "Turn the radio off",
        boton: "ES", botonTitulo: "Cambiar a español" },
};

const ESPANOL = {};
for (const el of document.querySelectorAll("[data-i18n]")) ESPANOL[el.dataset.i18n] = el.innerHTML;

function idiomaInicial() {
  try {
    const guardado = localStorage.getItem("idioma");
    if (guardado === "es" || guardado === "en") return guardado;
  } catch { /* sin almacenamiento: se elige por el navegador */ }
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}
let idioma = idiomaInicial();

window.frase = clave => FRASES[idioma][clave];

function aplicar() {
  document.documentElement.lang = idioma;
  for (const el of document.querySelectorAll("[data-i18n]")) {
    const t = idioma === "en" ? INGLES[el.dataset.i18n] : ESPANOL[el.dataset.i18n];
    if (t !== undefined) el.innerHTML = t;
  }
  const boton = document.querySelector(".boton--idioma");
  boton.textContent = frase("boton");
  boton.title = frase("botonTitulo");
  document.dispatchEvent(new Event("idioma"));
}

document.querySelector(".boton--idioma").addEventListener("click", () => {
  idioma = idioma === "es" ? "en" : "es";
  try { localStorage.setItem("idioma", idioma); } catch { /* sin almacenamiento: dura hasta recargar */ }
  aplicar();
});
aplicar();
