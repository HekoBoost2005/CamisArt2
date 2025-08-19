// noticias.js - CamisArt
// Carga dinámica de noticias desde un archivo JSON y las muestra en la página

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("noticias");

  // Devuelve el prefijo correcto para encontrar /data/noticias.json
  // - Local (file://, localhost): ""  -> "data/noticias.json"
  // - GitHub Pages (usuario.github.io/Repo/...): "/Repo/"
  function getBasePath() {
    const isLocal =
      location.protocol === "file:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    if (isLocal) return "";

    // En GitHub Pages de proyecto, la URL es: https://usuario.github.io/REPO/...
    // Tomamos el primer segmento del path como nombre del repo.
    const segments = location.pathname.split("/").filter(Boolean);
    if (location.hostname.endsWith("github.io") && segments.length) {
      return `/${segments[0]}/`; // p.ej. "/CamisArt/"
    }

    // Otros servidores (custom domain o user site)
    return "/";
  }

  const basePath = getBasePath();
  const urlNoticias = `${basePath}data/noticias.json`;
  // Útil para depurar si algo falla:
  console.log("Cargando noticias desde:", urlNoticias);

  function mostrarNoticias(noticias) {
    contenedor.innerHTML = "";
    noticias.forEach((noticia) => {
      const div = document.createElement("article");
      div.className = "noticia";
      div.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.contenido}</p>`;
      contenedor.appendChild(div);
    });
  }

  fetch(urlNoticias, { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(mostrarNoticias)
    .catch((err) => {
      console.error("Error cargando noticias:", urlNoticias, err);
      contenedor.innerHTML = "<p>Error al cargar las noticias.</p>";
    });
});