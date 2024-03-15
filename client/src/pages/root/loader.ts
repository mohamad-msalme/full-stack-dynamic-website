import { IsAuthQuery } from "@src/api/services/isAuthQuery";
import { WebsiteQuery } from "@src/api/services/website";
import { Website } from "@src/models/Website";
import { QueryClient } from "@tanstack/react-query";
import { RouteObject } from "react-router-dom";

export type TLoaderResponse = {
  websites: Website[];
};
export const loader =
  (queryClient: QueryClient): RouteObject["loader"] =>
  async () => {
    await queryClient.fetchQuery(IsAuthQuery());
    const websites = await queryClient.ensureQueryData(WebsiteQuery());
    return {
      websites: websites ?? [],
    };
  };
