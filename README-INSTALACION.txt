# LogiTrack — GitHub Pages + versión local por Wi-Fi

## Direcciones previstas
- GitHub Pages: https://jhonayker777.github.io/logitrack-frontend/
- Frontend local: http://192.168.38.36:5500/
- Backend Spring Boot: http://192.168.38.36:8080/
- MySQL sigue local al computador principal: localhost:3307. NO abrir el puerto 3307 en el firewall.

## A. Aplicar el parche
Copia cada archivo de este ZIP a la ruta equivalente de tu proyecto, conservando las carpetas:
- Frontend/js/config.js (nuevo)
- Frontend/index.html
- Frontend/app.html
- Frontend/auth.js
- Frontend/js/services/http.js
- Backend/src/main/java/LogiTrack/API/config/SecurityConfig.java

Añade estas dos líneas al final de tu application.properties actual:

    server.address=0.0.0.0
    server.port=8080

No reemplaces application.properties completo: conserva datasource, JWT y correo. No publiques esos secretos en GitHub.

## B. Ejecutar el backend
1. Inicia MySQL en el computador principal; debe seguir escuchando localmente en el puerto 3307.
2. Reinicia Spring Boot.
3. Mantén Spring Boot encendido mientras se use LogiTrack.

## C. Ejecutar el frontend local para Wi-Fi
1. Copia Frontend/iniciar-logitrack-wifi.bat a la raíz de la carpeta Frontend.
2. Haz doble clic para iniciarlo. Requiere Python instalado.
3. En el computador principal abre http://localhost:5500/.
4. En otros computadores del mismo Wi-Fi abre http://192.168.38.36:5500/.
5. Mantén abierta la ventana del servidor frontend.

Alternativa manual: abre CMD dentro de la carpeta Frontend y ejecuta:
    python -m http.server 5500 --bind 0.0.0.0

## D. Firewall de Windows
Crea reglas de entrada TCP para los puertos 8080 y 5500, permitidas solo en el perfil Privado. No abras el puerto 3307. Asegúrate de que Windows identifique el Wi-Fi como red Privada. Si la red es de invitados o tiene aislamiento de clientes, los otros equipos no podrán comunicarse.

## E. GitHub Pages
Sube los cambios de la carpeta Frontend al repositorio Jhonayker777/logitrack-frontend. GitHub Pages debe seguir sirviendo la página mediante HTTPS. En Chrome/Edge, cuando GitHub Pages intente conectar con 192.168.38.36, el navegador puede solicitar permiso de acceso a la red local: concédelo.

CORS autoriza el origen https://jhonayker777.github.io (el origen no incluye /logitrack-frontend/). Si usas un dominio personalizado, agrega su origen exacto en SecurityConfig.java.

## F. Límites y seguridad
- La IP 192.168.38.36 debe reservarse en el router mediante DHCP reservation para que no cambie.
- GitHub Pages conectará a la API local solo si el equipo cliente está en la misma Wi-Fi, el computador servidor y Spring Boot están encendidos y el navegador concede acceso a la red local.
- La copia local funciona dentro de la red Wi-Fi sin depender del permiso de GitHub Pages.
- Esto no permite acceso desde fuera de la red Wi-Fi.
- No abras el puerto 3307 ni publiques MySQL directamente.
- No publiques credenciales MySQL, contraseñas SMTP ni secretos JWT. Si ya se publicaron, cámbialos.
