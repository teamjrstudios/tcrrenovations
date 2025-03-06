// services/authService.js

const API_URL = 'http://localhost:5005';
const LOGIN_ENDPOINT = `${API_URL}/api/auth/login`;
interface LoginResponse {
    username: string;
    password: string;
}
export const login = async ({username, password}: LoginResponse) => {
    try {
        const res = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Authentication failed: ${res.status}`);
        }

        const data = await res.json();

        // Store the token in localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user || { username }));
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};