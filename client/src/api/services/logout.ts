/* eslint-disable no-useless-catch */
import { axiosInstance } from "../client";

export const LogoutMutaion = () => ({
  mutationKey: ["signinMutaion"],
  mutationFn: async () => logout(),
});

const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    throw error;
  }
};
