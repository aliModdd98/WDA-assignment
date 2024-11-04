import axios from "axios";

// Base URL from the environment variable (e.g., from your .env file in Vite)
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);
const axiosInstance = axios.create({
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
