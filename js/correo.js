
const inputCorreo = document.getElementById('email');
const avisoDescuento = document.getElementById('avisoDescuento');

// Verificamos que ambos elementos existan antes de configurar el evento
if (inputCorreo && avisoDescuento) {
    
    inputCorreo.addEventListener('input', function () {
        const email = this.value;
        

        if (!email || typeof email !== 'string') {
            avisoDescuento.style.display = 'none';
            return;
        }

        const correoMin = email.toLowerCase().trim();

        // Evaluamos si el correo termina en los dominios institucionales
        if (correoMin.endsWith('@duocuc.cl') || correoMin.endsWith('@profesor.duoc.cl')) {
            avisoDescuento.style.display = 'block';
        } else {
            avisoDescuento.style.display = 'none'; 
        }
    });

} else {
    console.error("Error: No se encontró el campo 'email' o el div 'avisoDescuento' en el HTML.");
}
