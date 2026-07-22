import api from "./api";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data);
};

export const resendOtp = (data) => {
  return api.post("/auth/resend-otp", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const uploadProfileImage = (formData) => {
  return api.post("/auth/upload-profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};