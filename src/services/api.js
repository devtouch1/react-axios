import axios from "axios";

const api = axios.create({
  baseURL: "https://nodejs-production-c1b5.up.railway.app/",
});

export default api;