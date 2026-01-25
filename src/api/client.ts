const BASE_URL = import.meta.env.VITE_STEWARDHQ_API_BASE_URL;
const API_KEY = import.meta.env.VITE_STEWARDHQ_API_KEY;

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "x-api-key": API_KEY,
            ...options.headers
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
};
