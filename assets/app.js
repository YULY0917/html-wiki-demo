// Marca el enlace activo del menú
function markActiveMenu() {
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".sidebar a").forEach(a => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "");
    if (href && path.endsWith(href)) {
      a.classList.add("active");
    }
  });
}

// Buscador simple (filtra tarjetas)
function wireSearch() {
  const input = document.getElementById("search");
  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll("[data-card]").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q)
        ? ""
        : "none";
    });
  });
}

// Construye el “Contenido de la página” (panel derecho)
function buildTOC() {
  const toc = document.getElementById("toc");
  if (!toc) return;

  const headers = document.querySelectorAll("main h2, main h3");
  toc.innerHTML = "";

  headers.forEach(h => {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-áéíóúñ]/gi, "");
    }
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    toc.appendChild(a);
  });
}

// Carga el menú lateral
function loadMenu() {
  fetch("/html-wiki-demo/assets/menu.html")
    .then(r => r.text())
    .then(html => {
      document.getElementById("menu").innerHTML = html;
      markActiveMenu();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
  wireSearch();
  buildTOC();
});
