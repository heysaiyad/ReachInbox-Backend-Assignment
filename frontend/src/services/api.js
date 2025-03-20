import axios from "axios";

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export default api;
