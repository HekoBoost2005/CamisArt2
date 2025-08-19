// noticias.js - CamisArt
// Carga dinámica de noticias desde un archivo JSON y las muestra en la página

document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("noticias");

    // Detectar si estamos en GitHub Pages o en local
    let urlNoticias;
    if (location.hostname === "localhost" || location.protocol === "file:") {
        // Si se abre en local (file:// o localhost)
        urlNoticias = "data/noticias.json";
    } else {
        // Si está publicado en GitHub Pages
        urlNoticias = location.origin + "/CamisArt/data/noticias.json";
    }

    // Función para crear y mostrar las noticias
    function mostrarNoticias(noticias) {
        contenedor.innerHTML = ""; // Limpiar contenido previo

        noticias.forEach(noticia => {
            const div = document.createElement("div");
            div.classList.add("noticia"); 

            div.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.contenido}</p>
            `;

            contenedor.appendChild(div);
        });
    }

    // Cargar las noticias con Fetch API
    fetch(urlNoticias)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener las noticias");
            return res.json();
        })
        .then(data => {
            mostrarNoticias(data);
        })
        .catch(err => {
            console.error("Error cargando noticias:", err);
            contenedor.innerHTML = "<p>Error al cargar las noticias.</p>";
        });
});