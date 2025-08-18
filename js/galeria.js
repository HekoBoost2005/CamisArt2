// galeria.js - CamisArt
// Script para filtrar las camisetas de la galería según su categoría

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.filtro');   // Botones de filtro
    const camisetas = document.querySelectorAll('.camiseta'); // Elementos de la galería

    // Recorremos cada botón de filtro
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.dataset.categoria; // Categoría seleccionada

            // Filtrar las camisetas según la categoría
            camisetas.forEach(camiseta => {
                if (categoria === 'todos') {
                    camiseta.style.display = 'block';
                } else {
                    camiseta.style.display = camiseta.classList.contains(categoria) ? 'block' : 'none';
                }
            });

            // Marcar el botón activo visualmente
            botones.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
        });
    });
});