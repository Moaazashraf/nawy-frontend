import axios from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true, // Ensure that cookies are sent with cross-origin requests
});

export default api;
