// noticias.js - CamisArt
// Carga dinámica de noticias desde un archivo JSON y las muestra en la página

document.addEventListener("DOMContentLoaded", function () {
    // Ruta del archivo JSON con las noticias
    const urlNoticias = "data/noticias.json";
    const contenedor = document.getElementById("noticias");

    // Función para crear y mostrar las noticias
    function mostrarNoticias(noticias) {
        contenedor.innerHTML = ""; // Limpiar contenido previo

        noticias.forEach(noticia => {
            // Crear un contenedor para cada noticia
            const div = document.createElement("div");
            div.classList.add("noticia"); // Clase para CSS

            // Título y contenido de la noticia
            div.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.contenido}</p>
            `;

            contenedor.appendChild(div);
        });
    }

    // Cargar las noticias con Fetch API
    fetch(datos/noticias.json)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener las noticias");
            return res.json();
        })
        .then(data => {
            mostrarNoticias(data);
        })
        .catch(() => {
            contenedor.innerHTML = "<p>Error al cargar las noticias.</p>";
        });
});