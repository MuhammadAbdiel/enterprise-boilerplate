import { User } from "../types";
import axiosInstance from "@/lib/axios";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await axiosInstance.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
