// presupuesto.js - CamisArt
// Script para validación de formulario y cálculo dinámico de presupuesto

document.addEventListener("DOMContentLoaded", function () {
    // Elementos del formulario
    const form = document.getElementById("formPresupuesto");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const total = document.getElementById("total");
    const condiciones = document.getElementById("condiciones");

    // Validar campos de texto (solo letras, con límite de caracteres)
    function validarTexto(valor, max, campo) {
        const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!soloLetras.test(valor) || valor.length > max) {
            alert(`El campo ${campo} no es válido.`);
            return false;
        }
        return true;
    }

    // Validar teléfono (exactamente 9 dígitos)
    function validarTelefono(valor) {
        const soloNumeros = /^[0-9]{9}$/;
        if (!soloNumeros.test(valor)) {
            alert("El teléfono debe contener exactamente 9 dígitos numéricos.");
            return false;
        }
        return true;
    }

    // Calcular precio total
    function calcularTotal() {
        let precioBase = parseFloat(producto.value) || 0;
        let extrasTotal = 0;

        // Sumar extras seleccionados
        extras.forEach(extra => {
            if (extra.checked) {
                extrasTotal += parseFloat(extra.value);
            }
        });

        // Calcular descuento según plazo
        let dias = parseInt(plazo.value) || 0;
        let descuento = 0;
        if (dias >= 10 && dias < 20) {
            descuento = 0.05; // 5%
        } else if (dias >= 20) {
            descuento = 0.10; // 10%
        }

        // Calcular total final
        let totalCalculado = (precioBase + extrasTotal) * (1 - descuento);
        total.textContent = totalCalculado.toFixed(2) + "€";
    }

    // Eventos para recalcular el precio dinámicamente
    producto.addEventListener("change", calcularTotal);
    plazo.addEventListener("input", calcularTotal);
    extras.forEach(extra => {
        extra.addEventListener("change", calcularTotal);
    });

    // Validar y enviar formulario
    form.addEventListener("submit", function (e) {
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();

        let valido = true;

        if (!validarTexto(nombre, 15, "Nombre")) valido = false;
        if (!validarTexto(apellidos, 40, "Apellidos")) valido = false;
        if (!validarTelefono(telefono)) valido = false;
        if (!email.includes("@") || !email.includes(".")) {
            alert("El correo electrónico no es válido.");
            valido = false;
        }
        if (!condiciones.checked) {
            alert("Debes aceptar las condiciones de privacidad.");
            valido = false;
        }

        if (!valido) {
            e.preventDefault(); // Bloquear envío si hay errores
        } else {
            alert("¡Presupuesto enviado correctamente!");
        }
    });

    // Calcular total al cargar la página
    calcularTotal();
});