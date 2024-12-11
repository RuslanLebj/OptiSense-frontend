import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/token/`, {
        username,
        password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
};

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error("No refresh token found");

    const response = await axios.post(`${baseUrl}/token/refresh/`, {
        refresh,
    });
    const { access } = response.data;
    localStorage.setItem("access", access);
};

export const verifyToken = async () => {
    const access = localStorage.getItem("access");
    if (!access) throw new Error("No access token found");

    await axios.post(`${baseUrl}/token/verify/`, { token: access });
};
