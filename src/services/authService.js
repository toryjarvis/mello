// Authentication service
import { jwtDecode } from "jwt-decode";
import api from "../config/apiConfig"

export const register = async (username, email, password) => {
  try {
    const response = await api.post(`/auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const authLogout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwtDecode(token);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
