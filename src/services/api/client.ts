import axios from "axios";

const api = axios.create({
  baseURL: "https://splendid-weekly-eft.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": true,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default api;
