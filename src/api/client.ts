const BASE_URL: string = import.meta.env.VITE_STEWARDHQ_API_BASE_URL as string;
const API_KEY: string = import.meta.env.VITE_STEWARDHQ_API_KEY as string;

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            ...options.headers
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
};
