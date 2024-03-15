import { useQuery } from "@tanstack/react-query";
import { WebsiteQuery } from "@src/api/services/website";
import { useLoaderData } from "react-router-dom";
import { TLoaderResponse } from "./loader";

export const useData = () => {
  const { websites } = useLoaderData() as TLoaderResponse;
  const { data } = useQuery({ ...WebsiteQuery(), initialData: websites });
  return data;
};
