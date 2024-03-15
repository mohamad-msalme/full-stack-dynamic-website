/* eslint-disable no-useless-catch */
import { isAxiosError } from "axios";
import { axiosInstance } from "../client";
import { SuccessResponse } from "@src/models/SuccessResponse";
import { User } from "@src/models/User";

type TVariables = {
  email: string;
  password: string;
  name: string;
};

export const signupMutation = () => ({
  mutationKey: ["signupMutation"],
  mutationFn: async (variables: TVariables) => signup(variables),
});

export const signup = async ({ email, password, name }: TVariables) => {
  try {
    const data = await axiosInstance.post<SuccessResponse<User>>(
      "/auth/register",
      {
        email,
        password,
        username: name,
      }
    );
    return data.data.success.data;
  } catch (error) {
    let message = "Somthing went wrong, please try again";
    if (isAxiosError(error) && error.status === 401) throw error;
    if (
      isAxiosError<{ error: { message: string } }>(error) &&
      error.response?.data.error.message
    ) {
      message = error.response.data.error.message;
    }
    throw Error(message);
  }
};
