import { User, UserRole } from "@prisma/client"
import { axiosInstance } from "./instance"

export const getAllUsers = async (): Promise<User[]> => {
	return (await axiosInstance.get<User[]>("/users")).data
}
export const getMe = async (id: number): Promise<User> => {
	return (await axiosInstance.get<User>("/users/" + id)).data
}
export const editUser = async (id: number, role: UserRole): Promise<User> => {
	return (await axiosInstance.patch<User>("/users/" + id, { role })).data
}
export const delitUser = async (id: number): Promise<User> => {
	return (await axiosInstance.delete<User>("/users/" + id)).data
}
