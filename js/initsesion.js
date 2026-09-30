document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Función auxiliar para validar la estructura del correo
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    form.addEventListener('submit', (e) => {
        // Prevenir el envío automático del formulario
        e.preventDefault();

        // Limpiar mensajes de error previos
        emailError.textContent = '';
        passwordError.textContent = '';

        let isValid = true;

        // 1. Validar correo obligatorio y formato
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!validarEmail(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, ingresa un correo válido.';
            isValid = false;
        }

        // 2. Validar contraseña obligatoria y longitud
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        // 3. Procesar el envío si todo es válido
        if (isValid) {
            console.log('Formulario válido. Procesando inicio de sesión...');
            // Aquí puedes enviar los datos mediante fetch/axios o usar form.submit()
        }
    });
});