/* eslint-disable no-useless-catch */
import { isAxiosError } from "axios";
import { axiosInstance } from "../client";
import { ErrorResponse } from "@src/models/ErrorResponse";
import { TargetAudience } from "@src/models/TargetAudience";
import { SuccessResponse } from "@src/models/SuccessResponse";

export const TargetAudienceQuery = () => ({
  queryKey: ["TargetAudienceQuery"],
  queryFn: async () => getTargetAudience(),
});

export const TargetAudienceMutation = () => ({
  mutationKey: ["TargetAudienceMutation"],
  mutationFn: async (variable: string) => createTargetAudience(variable),
});

const createTargetAudience = async (name: string) => {
  try {
    const data = await axiosInstance.post<SuccessResponse<TargetAudience>>(
      "/targetAudience/new",
      {
        name,
      }
    );
    return data.data.success.data;
  } catch (error) {
    const msg = "Server error";
    if (isAxiosError(error) && error.status === 401) throw error;
    if (
      isAxiosError<ErrorResponse>(error) &&
      error.response?.data.error.message
    )
      throw new Error(error.response?.data.error.message ?? msg);
    throw new Error(msg);
  }
};

const getTargetAudience = async () => {
  try {
    const data =
      await axiosInstance.get<SuccessResponse<TargetAudience[]>>(
        "/targetAudience"
      );
    return data.data.success.data;
  } catch (error) {
    throw error;
  }
};
