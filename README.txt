# LogiTrack - configuración automática de la API

Este paquete contiene `js/config.js` para centralizar la URL del backend.

## Cambios que debes hacer en el repositorio

1. Copia `js/config.js` en la carpeta `js/` de tu frontend.
2. En `index.html`, carga la configuración antes de `auth.js`:

   ```html
   <script src="js/config.js"></script>
   <script src="auth.js"></script>
   ```

3. En `app.html`, carga la configuración antes del módulo `app.js`:

   ```html
   <script src="js/config.js"></script>
   <script type="module" src="app.js"></script>
   ```

4. En `auth.js`, reemplaza la dirección fija por:

   ```js
   const API_BASE = window.LOGITRACK_API_BASE || 'http://localhost:8080';
   ```

5. En `js/services/http.js`, reemplaza la dirección fija por:

   ```js
   const API_BASE_URL = window.LOGITRACK_API_BASE || 'http://localhost:8080';
   ```

6. Publica los cambios en GitHub para que Netlify vuelva a desplegar.

## Configurar otra dirección una sola vez

Si el backend está en otro computador de la misma red, abre la consola del navegador (F12 > Console) y ejecuta:

```js
localStorage.setItem('logitrack_api_base', 'http://192.168.1.50:8080');
location.reload();
```

Sustituye `192.168.1.50` por la IP LAN real del computador que ejecuta Spring Boot.

Para borrar esa configuración:

```js
localStorage.removeItem('logitrack_api_base');
location.reload();
```

## Límites importantes

- JavaScript en una página de Netlify no puede descubrir de forma fiable la IP privada del computador que aloja Spring Boot.
- Si abres Netlify en el mismo computador del backend, `localhost` es la dirección adecuada.
- Si otra persona abre Netlify desde su computador, `localhost` apuntará al computador de esa persona, no al tuyo.
- Una IP privada como `192.168.x.x` solo funciona dentro de la misma red local. Para acceso desde internet se necesita un túnel HTTPS o publicar el backend.
- Spring Boot debe permitir CORS desde `https://leafy-churros-50adee.netlify.app`.
- En Chrome actual puede aparecer un permiso de acceso a la red local o a localhost. Debes permitirlo para que la conexión funcione.
- No uses este mecanismo para exponer el puerto 8080 directamente a internet.
