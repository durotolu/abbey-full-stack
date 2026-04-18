import axios from "axios";
import { getToken } from "../utils/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log("import.meta.env.VITE_BACKEND_URL", backendUrl);

export const api = axios.create({
  baseURL: backendUrl,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
