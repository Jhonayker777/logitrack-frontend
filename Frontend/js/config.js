/* LogiTrack: configuración única de la API para GitHub Pages y red local. */
(() => {
  const clean = (value) => String(value || "").trim().replace(/\/+$/, "");
  const LAN_SERVER_IP = "192.168.38.36"; // Computador que ejecuta Spring Boot
  const API_PORT = "8080";

  // Para fijar manualmente otra dirección en este navegador:
  // localStorage.setItem("logitrack_api_base", "http://192.168.38.36:8080");
  // Para borrar el ajuste: localStorage.removeItem("logitrack_api_base");
  const manual = clean(localStorage.getItem("logitrack_api_base"));
  if (manual) {
    window.LOGITRACK_API_BASE = manual;
    console.info("[LogiTrack] API manual:", manual);
    return;
  }

  const host = window.location.hostname;
  const isPrivateIPv4 = (value) => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(value);

  // La versión local toma la IP desde la que se abrió el frontend.
  // GitHub Pages utiliza la IP LAN fija del computador servidor.
  let apiHost = LAN_SERVER_IP;
  if (host === "localhost" || host === "127.0.0.1") {
    apiHost = "localhost";
  } else if (isPrivateIPv4(host)) {
    apiHost = host;
  }

  window.LOGITRACK_API_BASE = `http://${apiHost}:${API_PORT}`;
  console.info("[LogiTrack] API seleccionada:", window.LOGITRACK_API_BASE);
})();
