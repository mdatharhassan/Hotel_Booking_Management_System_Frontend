import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Interceptors to add token to requests
api.interceptors.response.use(
  (config) => {
    const accessToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
// api.interceptors.request.use(
//   (config) => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("accessToken="))
//       ?.split("=")[1];
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
