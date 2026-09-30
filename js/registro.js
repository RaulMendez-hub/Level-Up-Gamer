//variables para obtener los elementos del formulario y los campos de contraseña
const formulario = document.getElementById("registroForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const mensaje = document.getElementById("mensajeRegistro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Comprobar que las contraseñas sean iguales
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity( "Las contraseñas no coinciden" );
    } else {
        confirmPassword.setCustomValidity("");
    }

    // Activar las validaciones de Bootstrap
    formulario.classList.add("was-validated");

    // Comprobar si el formulario tiene errores
    if (!formulario.checkValidity()) {
        return;
    }

function notificarPorCorreo(email) {
    if (!email || typeof email !== 'string') return;

    const correoMin = email.toLowerCase().trim();

    if (correoMin.endsWith('@gmail.com')) {
        alert('Notificación: iniciando con una cuenta de Google.');
    } else if (correoMin.endsWith('@levelup.com')) {
        alert('Notificación: Acceso administrador corporativo.');
    } else if (correoMin.endsWith('@duocuc.cl')) {
        alert('Notificación: Has obtenido un 20% de descuento por ser parte de Duoc.');
    }
}

const inputCorreo = document.getElementById('email');

if (inputCorreo) {
    inputCorreo.addEventListener('change', function () {
        notificarPorCorreo(this.value);
    });
}



    // Mostrar mensaje de registro exitoso
    mensaje.classList.remove("d-none");
    mensaje.classList.remove("alert-danger");
    mensaje.classList.add("alert-success");
    mensaje.textContent = "¡Registro exitoso! Tu cuenta ha sido creada.";

    // Mostrar los datos en la consola solo para demostrar que JavaScript recibió los datos
    console.log("Usuario registrado");
    console.log( "Nombre:", document.getElementById("nombre").value );
    console.log( "Apellido:", document.getElementById("apellido").value );
    console.log( "Correo:", document.getElementById("email").value );

    // Limpiar el formulario
    formulario.reset();
    formulario.classList.remove("was-validated");
});
