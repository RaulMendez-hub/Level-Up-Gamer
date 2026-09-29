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

    // Mostrar mensaje de registro exitoso 
    mensaje.classList.remove("d-none");
    mensaje.classList.remove("alert-danger");
    mensaje.classList.add("alert-success");
    mensaje.textContent = "¡Registro exitoso! Tu cuenta ha sido creada.";
    
});