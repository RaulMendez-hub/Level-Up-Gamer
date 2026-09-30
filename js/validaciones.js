const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function validarCorreo(correo) {
  if (!correo) return false;
  if (correo.length > 100) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+)$/;
  const match = correo.match(regex);
  if (!match) return false;
  const dominio = match[1].toLowerCase();
  return DOMINIOS_PERMITIDOS.includes(dominio);
}

function validarContrasena(pass) {
  return typeof pass === "string" && pass.length >= 4 && pass.length <= 10;
}

function validarRun(run) {
  if (!run) return false;
  const limpio = run.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false;
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dvEsperado === dv;
}

function esMayorDeEdad(fechaNacimientoStr) {
  if (!fechaNacimientoStr) return false;
  const nacimiento = new Date(fechaNacimientoStr);
  if (isNaN(nacimiento.getTime())) return false;
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 18;
}

function validarTexto(valor, { requerido = true, min = 0, max = Infinity } = {}) {
  if (!valor || !valor.trim()) return !requerido;
  const len = valor.trim().length;
  return len >= min && len <= max;
}

function marcarCampo(inputEl, errorEl, esValido, mensajeError) {
  if (esValido) {
    inputEl.classList.remove("invalid");
    inputEl.classList.add("valid");
    errorEl.textContent = "";
  } else {
    inputEl.classList.remove("valid");
    inputEl.classList.add("invalid");
    errorEl.textContent = mensajeError;
  }
  return esValido;
}

function correoEsDuoc(correo) {
  if (!correo || correo.indexOf("@") === -1) return false;
  const dominio = correo.split("@")[1].toLowerCase();
  return dominio === "duoc.cl" || dominio === "profesor.duoc.cl";
}