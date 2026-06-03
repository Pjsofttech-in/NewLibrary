import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const BASE_URL = "http://localhost:8110";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("authToken") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dW52aUBnbWFpbC5jb20iLCJpYXQiOjE3NzkyNzU4NjQsImV4cCI6MTc3OTI3OTQ2NH0.Tdn3mZ_LR0dvI4qKHzd1Qbksai-ZtE3GHpSV9snJbYk";
    console.log("Token before request:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: handle expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        sessionStorage.clear(); // Clear token and other session data
        window.location.href = "/superadminclient/"; // Navigate to login
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
