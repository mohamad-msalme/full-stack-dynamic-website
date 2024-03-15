import { User } from "@src/models/User";
import { isAxiosError } from "axios";
import { axiosInstance } from "../client";
import { SuccessResponse } from "@src/models/SuccessResponse";

type TVariables = {
  email: string;
  password: string;
};

export const signinMutaion = () => ({
  mutationKey: ["signinMutaion"],
  mutationFn: async (variables: TVariables) => signin(variables),
});

export const signin = async ({ email, password }: TVariables) => {
  try {
    const data = await axiosInstance.post<SuccessResponse<User>>(
      "/auth/login",
      {
        email,
        password,
      }
    );
    return data.data.success.data;
  } catch (error) {
    let message = "Somthing went wrong, please try again";
    if (
      isAxiosError<{ error: { message: string } }>(error) &&
      error.response?.data.error.message
    ) {
      message = error.response.data.error.message;
    }
    throw Error(message);
  }
};
