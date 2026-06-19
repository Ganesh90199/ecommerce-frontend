import axiosInstance from "../utils/axiosConfig";

export const registerUser = (userData) => {
  return axiosInstance.post("/api/auth/register", userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post("/api/auth/login", userData);
};