const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const apiGet = async (endpoint, signal) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
};

export const apiPost = async (endpoint, body) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
};

export default API_BASE_URL;
