import { axiosInstance } from "./instance"
import { StoreDTO } from "./dto/stores.dto"
import { Store } from "@prisma/client"

export const getAllStores = async (): Promise<StoreDTO[]> => {
	return (await axiosInstance.get<StoreDTO[]>("/stores")).data
}
export const getStore = async (id: number): Promise<StoreDTO> => {
	return (await axiosInstance.get<StoreDTO>("/stores/" + id)).data
}
export const addStore = async (store: StoreDTO): Promise<StoreDTO> => {
	return (await axiosInstance.post<StoreDTO>("/stores", store)).data
}
export const editStore = async (
	id: number,
	store: StoreDTO,
): Promise<StoreDTO> => {
	return (await axiosInstance.patch<StoreDTO>("/stores/" + id, store)).data
}
export const deleteStore = async (id: number): Promise<StoreDTO> => {
	return (await axiosInstance.delete<StoreDTO>("/stores/" + id)).data
}
export const storeName = async (id: number): Promise<Store> => {
	return (await axiosInstance.get<Store>("/store/" + id)).data
}
