/*
 * LogiTrack - detección de dirección de API
 *
 * Netlify abierto en el mismo computador que ejecuta Spring Boot:
 *   usa http://localhost:8080
 *
 * Frontend servido desde una IP privada:
 *   usa esa misma IP en el puerto 8080
 *
 * Para fijar otra dirección en este navegador:
 *   localStorage.setItem('logitrack_api_base', 'http://192.168.1.50:8080');
 *   location.reload();
 *
 * Para borrar el ajuste manual:
 *   localStorage.removeItem('logitrack_api_base');
 *   location.reload();
 */
(() => {
  const normalize = (value) => String(value || "").replace(/\/+$/, "");

  const savedUrl = localStorage.getItem("logitrack_api_base");
  if (savedUrl) {
    window.LOGITRACK_API_BASE = normalize(savedUrl);
    console.info("[LogiTrack] API configurada manualmente:", window.LOGITRACK_API_BASE);
    return;
  }

  const host = window.location.hostname;
  const isLoopback = host === "localhost" || host === "127.0.0.1";
  const isPrivateIPv4 =
    /^10\.(\d{1,3}\.){2}\d{1,3}$/.test(host) ||
    /^192\.168\.(\d{1,3}\.)\d{1,3}$/.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\.(\d{1,3}\.)\d{1,3}$/.test(host);

  // En Netlify, localhost significa el computador que abre la página.
  // Por eso el backend debe estar ejecutándose en ese mismo computador.
  const backendHost = (isLoopback || isPrivateIPv4) ? host : "localhost";

  window.LOGITRACK_API_BASE = `http://${backendHost}:8080`;
  console.info("[LogiTrack] API detectada:", window.LOGITRACK_API_BASE);
})();
