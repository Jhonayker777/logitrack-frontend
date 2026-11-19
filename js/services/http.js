
const API_BASE_URL = 'https://accompany-pastime-scoop.ngrok-free.dev';

export function getToken() {
    return localStorage.getItem('logitrack_token');
}

function normalizeError(data, status) {
    if (typeof data === 'string') return data;
    if (data?.mensaje) return data.mensaje;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    if (Array.isArray(data?.errores)) {
        return data.errores.join(' · ');
    }

    return status === 403
        ? 'Tu rol no tiene permisos para realizar esta operación.'
        : `La solicitud falló (HTTP ${status}).`;
}

export async function api(path, {
    method = 'GET',
    body,
    headers = {}
} = {}) {

    const token = getToken();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,

        headers: {
            'Content-Type': 'application/json',

            // Evita la advertencia de ngrok.
            'ngrok-skip-browser-warning': '1',

            // Autenticación JWT.
            ...(token ? {
                Authorization: `Bearer ${token}`
            } : {}),

            ...headers
        },

        ...(body !== undefined
            ? { body: JSON.stringify(body) }
            : {})
    });

    const raw = await response.text();

    let data = null;

    try {
        data = raw ? JSON.parse(raw) : null;
    } catch {
        data = raw;
    }

    // Manejo de sesión vencida.
    if (response.status === 401) {
        localStorage.removeItem('logitrack_token');
        localStorage.removeItem('logitrack_user');

        sessionStorage.setItem('logitrack_expired', '1');

        location.replace('index.html');

        throw new Error(
            'La sesión expiró. Inicia sesión nuevamente.'
        );
    }

    // Manejo de otros errores.
    if (!response.ok) {
        throw new Error(normalizeError(data, response.status));
    }

    return data;
}
