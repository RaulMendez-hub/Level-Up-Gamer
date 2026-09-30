document.addEventListener("DOMContentLoaded", function () {

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

    // Mostrar mensaje de registro exitoso
    mensaje.classList.remove("d-none");
    mensaje.classList.remove("alert-danger");
    mensaje.classList.add("alert-success");
    mensaje.textContent = "¡Registro exitoso! Tu cuenta ha sido creada.";

        const comunas = regiones[region.value] || [];

        comunas.forEach(function (nombreComuna) {
            const option = document.createElement("option");

            option.value = nombreComuna;
            option.textContent = nombreComuna;
            comuna.appendChild(option);

        });

        comuna.disabled = !region.value;
        comuna.classList.remove("is-invalid");

    });


    //correo y validación si es de duoc o gmail para mostrar aviso de descuento
    email.addEventListener("input", function () {

        const correo = email.value.trim().toLowerCase();

        const correoValido =/@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
        const correoDuoc =/@(duoc\.cl|profesor\.duoc\.cl)$/i.test(correo);

        if (correoDuoc && correoValido) {

            avisoDescuento.style.display = "inline-block";
        } else {
            avisoDescuento.style.display = "none";
        }

    });


    //confirmar contraseña y validación si coinciden

    confirmPassword.addEventListener("input", function () {

        if (confirmPassword.value !== password.value) {

            confirmPassword.setCustomValidity("Las contraseñas no coinciden");
        } else {
            confirmPassword.setCustomValidity("");
        }

    });


    password.addEventListener("input", function () {

        if (confirmPassword.value !== password.value) {

            confirmPassword.setCustomValidity("Las contraseñas no coinciden");
        } else {
            confirmPassword.setCustomValidity("");
        }

    });


    // funcion para validar el RUN chileno

    function validarRUN(valor) {

        valor = valor.toUpperCase().replace(/\./g, "").replace(/-/g, "");

        const formato = /^[0-9]{7,8}[0-9K]$/;
        return formato.test(valor);
    }


    run.addEventListener("input", function () {

        run.value = run.value.toUpperCase().replace(/[^0-9K]/g, "");

    });


    //funcion para validar si es mayor de 18 años

    function esMayorDe18(fecha) {

        if (!fecha) {
            return false;
        }

        const nacimiento = new Date(fecha);
        const hoy = new Date();

        let edad = hoy.getFullYear() - nacimiento.getFullYear();

        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad >= 18;
    }


    //submit del formulario y validaciones de los campos

    form.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();


        // Limpiar mensaje 
        mensajeRegistro.classList.add("d-none");

        mensajeRegistro.classList.remove("alert-success","alert-danger");

        let formularioValido = true;


        //run
        if (!validarRUN(run.value)) {

            run.classList.add("is-invalid");
            formularioValido = false;
        } else {
            run.classList.remove("is-invalid");
            run.classList.add("is-valid");

        }


        //edad

        if (!esMayorDe18(fechaNacimiento.value)) {

            fechaNacimiento.classList.add("is-invalid");
            formularioValido = false;
        } else {
            fechaNacimiento.classList.remove("is-invalid");
            fechaNacimiento.classList.add("is-valid");

        }


        //email
        const correoValido =/@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email.value.trim());

        if (!correoValido) {

            email.classList.add("is-invalid");
            formularioValido = false;
        } else {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");

        }


        //contraseña

        if (password.value.length < 4 || password.value.length > 10) {

            password.classList.add("is-invalid");
            formularioValido = false;
        } else {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");

        }


        //confirmar contraseña
        if ( confirmPassword.value !== password.value || confirmPassword.value === "" ) {

            confirmPassword.classList.add("is-invalid");
            formularioValido = false;
        } else {
            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.add("is-valid");

        }


        //region
        if (!region.value) {

            region.classList.add("is-invalid");
            formularioValido = false;
        } else {
            region.classList.remove("is-invalid");
            region.classList.add("is-valid");

        }


        //comuna
        if (!comuna.value) {

            comuna.classList.add("is-invalid");
            formularioValido = false;
        } else {
            comuna.classList.remove("is-invalid");
            comuna.classList.add("is-valid");

        }


        //validacion de boostrap
        if (!form.checkValidity()) {

            formularioValido = false;

        }


        //resultado
        if (!formularioValido) {

            form.classList.add("was-validated");
            mensajeRegistro.textContent =" Revisa los campos obligatorios ";
            mensajeRegistro.classList.remove("d-none");
            mensajeRegistro.classList.add("alert","alert-danger");

            return;
        }


        //registro correcto

        mensajeRegistro.textContent = " Cuenta creada correctamente ";
        mensajeRegistro.classList.remove("d-none");
        mensajeRegistro.classList.add("alert","alert-success");


        //Aquí posteriormente podemos conectar el formulario con un posible sistema de usuarios local
           

    });


    // quitar error al escribir

    const campos = [
        run,
        fechaNacimiento,
        nombre,
        apellidos,
        email,
        password,
        confirmPassword,
        region,
        comuna,
        direccion
    ];


    campos.forEach(function (campo) {

        campo.addEventListener("input", function () {

            if (campo.checkValidity()) {

                campo.classList.remove("is-invalid");

            }

        });

    });


