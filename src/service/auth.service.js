import { post, put } from "../config/api";

export const login = async ({ username, password }) => {
  return await post("auth/login", { username, password });
};

export const refreshToken = async () => {
  const response = await put("auth/refreshToken");
  return response.accessToken;
};

export const logout = async () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
