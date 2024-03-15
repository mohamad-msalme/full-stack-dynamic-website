/* eslint-disable no-useless-catch */
import { Website } from "@src/models/Website";
import { axiosInstance } from "../client";
import { SuccessResponse } from "@src/models/SuccessResponse";
import { TWebsiteSchema } from "@src/components/AddWebsiteDialog";

export const WebsiteQuery = () => ({
  queryKey: ["WebsiteQuery"],
  queryFn: async () => getWebsite(),
});

export const WebsiteMutation = () => ({
  mutationKey: ["WebsiteMutation"],
  mutationFn: async (variable: TWebsiteSchema) => createWebsite(variable),
});

const getWebsite = async () => {
  try {
    const data =
      await axiosInstance.get<SuccessResponse<Website[]>>("/website");
    return data.data.success.data;
  } catch (error) {
    throw error;
  }
};

const createWebsite = async (variables: TWebsiteSchema) => {
  try {
    const { name, description, target } = variables;
    console.log({ variables, name, description, target });
    const data = await axiosInstance.post<SuccessResponse<Website>>(
      "/website/new",
      {
        websiteName: name,
        websiteDescription: description,
        targetAudienceId: target,
      }
    );
    console.log({ data: data.data.success.data });
    return data.data.success.data;
  } catch (error) {
    throw error;
  }
};
