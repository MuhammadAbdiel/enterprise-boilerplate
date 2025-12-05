import { Article } from "../types";
import axiosInstance from "@/lib/axios";

export const getArticles = async (): Promise<Article[]> => {
  const response = await axiosInstance.get<Article[]>("/posts", {
    params: { _limit: 6 },
  });
  return response.data;
};
