import api from "./api";

export const getSellerDashboard = async () => {
  const res = await api.get("/seller/dashboard");
  return res.data;
};