/* eslint-disable no-useless-catch */

import { axiosInstance } from "../client";
type TResponse = {
  success: { userId: number };
};
export const IsAuthQuery = () => ({
  queryKey: ["IsAuthQuery"],
  queryFn: async () => getIsAuth(),
});

const getIsAuth = async () => {
  try {
    const data = await axiosInstance.get<TResponse>("/auth/check-auth");
    return data.data.success.userId;
  } catch (error) {
    throw error;
  }
};
