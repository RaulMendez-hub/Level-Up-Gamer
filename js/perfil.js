    const CATEGORIAS = [
      "Juegos de Mesa", "Accesorios", "Consolas", "Computadores Gamers",
      "Sillas Gamers", "Mouse", "Mousepad", "Poleras Personalizadas",
      "Polerones Gamers Personalizados"
    ];

    document.addEventListener("DOMContentLoaded", () => {
      const sinSesion = document.getElementById("sinSesion");
      const conSesion = document.getElementById("conSesion");
      const raw = localStorage.getItem("levelup_usuario_actual");

      if (!raw) {
        sinSesion.style.display = "block";
        return;
      }

      const usuario = JSON.parse(raw);
      conSesion.style.display = "block";

      const run = document.getElementById("run");
      const fechaNacimiento = document.getElementById("fechaNacimiento");
      const nombre = document.getElementById("nombre");
      const apellidos = document.getElementById("apellidos");
      const correo = document.getElementById("correo");
      const region = document.getElementById("region");
      const comuna = document.getElementById("comuna");
      const direccion = document.getElementById("direccion");
      const preferenciasContainer = document.getElementById("preferenciasContainer");
      const mensajeFinal = document.getElementById("mensajeFinal");

      run.value = usuario.run || "";
      fechaNacimiento.value = usuario.fechaNacimiento || "";
      nombre.value = usuario.nombre || "";
      apellidos.value = usuario.apellidos || "";
      correo.value = usuario.correo || "";
      direccion.value = usuario.direccion || "";
      document.getElementById("puntosLevelUp").textContent = usuario.puntosLevelUp || 0;
      document.getElementById("badgeDuocPerfil").style.display = usuario.descuentoDuoc ? "inline-block" : "none";

      if (typeof poblarRegiones === "function") {
        poblarRegiones(region);
        region.value = usuario.region || "";
        if (typeof poblarComunas === "function") poblarComunas(region, comuna);
        comuna.value = usuario.comuna || "";
        region.addEventListener("change", () => poblarComunas(region, comuna));
      }

      const preferenciasActuales = usuario.preferencias || [];
      CATEGORIAS.forEach((cat, idx) => {
        const item = document.createElement("div");
        item.className = "preference-item";
        item.innerHTML = `
          <input type="checkbox" id="pref-${idx}" value="${cat}" ${preferenciasActuales.includes(cat) ? "checked" : ""}>
          <label for="pref-${idx}">${cat}</label>
        `;
        preferenciasContainer.appendChild(item);
      });

      if (typeof marcarCampo === "function") {
        nombre.addEventListener("input", () => marcarCampo(nombre, document.getElementById("err-nombre"), validarTexto(nombre.value, {max:50}), "El nombre es requerido."));
        apellidos.addEventListener("input", () => marcarCampo(apellidos, document.getElementById("err-apellidos"), validarTexto(apellidos.value, {max:100}), "Los apellidos son requeridos."));
        correo.addEventListener("input", () => marcarCampo(correo, document.getElementById("err-correo"), validarCorreo(correo.value), "Correo inválido."));
        fechaNacimiento.addEventListener("change", () => marcarCampo(fechaNacimiento, document.getElementById("err-fechaNacimiento"), !fechaNacimiento.value || esMayorDeEdad(fechaNacimiento.value), "Debes ser mayor de 18 años."));
        direccion.addEventListener("input", () => marcarCampo(direccion, document.getElementById("err-direccion"), validarTexto(direccion.value, {max:300}), "La dirección es requerida."));
      }

      document.getElementById("formPerfil").addEventListener("submit", (e) => {
        e.preventDefault();

        const validaciones = [
          validarTexto(nombre.value, {max:50}),
          validarTexto(apellidos.value, {max:100}),
          validarCorreo(correo.value),
          !fechaNacimiento.value || esMayorDeEdad(fechaNacimiento.value),
          region.value !== "",
          comuna.value !== "",
          validarTexto(direccion.value, {max:300})
        ];

        if (validaciones.every(Boolean)) {
          usuario.nombre = nombre.value.trim();
          usuario.apellidos = apellidos.value.trim();
          usuario.correo = correo.value.trim().toLowerCase();
          usuario.fechaNacimiento = fechaNacimiento.value;
          usuario.region = region.value;
          usuario.comuna = comuna.value;
          usuario.direccion = direccion.value.trim();
          usuario.descuentoDuoc = typeof correoEsDuoc === "function" ? correoEsDuoc(usuario.correo) : false;
          usuario.preferencias = CATEGORIAS.filter((cat, idx) => document.getElementById(`pref-${idx}`).checked);

          localStorage.setItem("levelup_usuario_actual", JSON.stringify(usuario));
          document.getElementById("badgeDuocPerfil").style.display = usuario.descuentoDuoc ? "inline-block" : "none";
          mensajeFinal.style.color = "#39FF14";
          mensajeFinal.textContent = "✅ Perfil actualizado correctamente.";
        } else {
          mensajeFinal.style.color = "#ff6b6b";
          mensajeFinal.textContent = "⚠ Revisa los campos marcados en rojo.";
        }
      });

      document.getElementById("btnCerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("levelup_usuario_actual");
        window.location.href = "index.html";
      });
    });