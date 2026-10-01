document.addEventListener("DOMContentLoaded", function () {
    // 1. Declaración de TODOS los elementos del DOM
    const form = document.getElementById("registroForm");
    const run = document.getElementById("run");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const direccion = document.getElementById("direccion"); // Agregado para evitar error
    const avisoDescuento = document.getElementById("avisoDescuento");
    const mensajeRegistro = document.getElementById("mensajeRegistro"); // Unificado

    // 2. Validación de correo (Duoc / Gmail) para mostrar descuento
    email.addEventListener("input", function () {
        const correo = email.value.trim().toLowerCase();
        const correoValido = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
        const correoDuoc = /@(duoc\.cl|profesor\.duoc\.cl)$/i.test(correo);

        if (correoDuoc && correoValido) {
            avisoDescuento.style.display = "inline-block";
        } else {
            avisoDescuento.style.display = "none";
        }
    });

    // 3. Validación en tiempo real de contraseñas coincidentes
    function validarContrasenas() {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Las contraseñas no coinciden");
        } else {
            confirmPassword.setCustomValidity("");
        }
    }
    password.addEventListener("input", validarContrasenas);
    confirmPassword.addEventListener("input", validarContrasenas);

    // 4. Formateo del RUN en tiempo real (solo números y K)
    run.addEventListener("input", function () {
        run.value = run.value.toUpperCase().replace(/[^0-9K]/g, "");
    });

    // Funciones auxiliares de validación
    function validarRUN(valor) {
        valor = valor.toUpperCase().replace(/\./g, "").replace(/-/g, "");
        const formato = /^[0-9]{7,8}[0-9K]$/;
        return formato.test(valor);
    }

    function esMayorDe18(fecha) {
        if (!fecha) return false;
        const nacimiento = new Date(fecha);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad >= 18;
    }

    // 5. Envío del formulario y validaciones comerciales/estrictas
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Limpiar estados del mensaje de alerta
        mensajeRegistro.classList.add("d-none");
        mensajeRegistro.classList.remove("alert-success", "alert-danger");

        let formularioValido = true;

        // Validar RUN chileno
        if (!validarRUN(run.value)) {
            run.classList.add("is-invalid");
            run.classList.remove("is-valid");
            formularioValido = false;
        } else {
            run.classList.remove("is-invalid");
            run.classList.add("is-valid");
        }

        // Validar Edad (+18)
        if (!esMayorDe18(fechaNacimiento.value)) {
            fechaNacimiento.classList.add("is-invalid");
            fechaNacimiento.classList.remove("is-valid");
            formularioValido = false;
        } else {
            fechaNacimiento.classList.remove("is-invalid");
            fechaNacimiento.classList.add("is-valid");
        }

        // Validar dominio de Email
        const correoValido = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email.value.trim());
        if (!correoValido) {
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            formularioValido = false;
        } else {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
        }

        // Validar largo de contraseña
        if (password.value.length < 4 || password.value.length > 10) {
            password.classList.add("is-invalid");
            password.classList.remove("is-valid");
            formularioValido = false;
        } else {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
        }

        // Validar confirmación de contraseña
        if (confirmPassword.value !== password.value || confirmPassword.value === "") {
            confirmPassword.classList.add("is-invalid");
            confirmPassword.classList.remove("is-valid");
            formularioValido = false;
        } else {
            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.add("is-valid");
        }

        // Validación nativa de HTML5 (required, etc.) via Bootstrap
        if (!form.checkValidity()) {
            formularioValido = false;
        }

        // Mostrar resultados finales
        if (!formularioValido) {
            form.classList.add("was-validated");
            mensajeRegistro.textContent = "Revisa los campos obligatorios o inválidos.";
            mensajeRegistro.classList.remove("d-none");
            mensajeRegistro.classList.add("alert", "alert-danger");
            return;
        }

        // Registro exitoso
        mensajeRegistro.textContent = "¡Cuenta creada correctamente!";
        mensajeRegistro.classList.remove("d-none");
        mensajeRegistro.classList.add("alert", "alert-success");
        form.classList.remove("was-validated");
        // form.reset(); // Descomenta esta línea si deseas limpiar el formulario al terminar
    });

    // 6. Limpieza dinámica de errores visuales al escribir
    const campos = [run, fechaNacimiento, nombre, apellidos, email, password, confirmPassword, region, comuna, direccion];
    
    campos.forEach(function (campo) {
        if (campo) { // Validar que el campo exista en el DOM
            campo.addEventListener("input", function () {
                if (campo.checkValidity()) {
                    campo.classList.remove("is-invalid");
                }
            });
        }
    });
});
