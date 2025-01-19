import { OrdersDTO } from "./dto/orders.dto"
import { axiosInstance } from "./instance"

export const getAllOrders = async (): Promise<OrdersDTO[]> => {
	return (await axiosInstance.get<OrdersDTO[]>("/orders")).data
}
export const getOrder = async (id: number): Promise<OrdersDTO> => {
	return (await axiosInstance.get<OrdersDTO>("/orders/" + id)).data
}
export const addOrder = async (order: OrdersDTO): Promise<OrdersDTO> => {
	return (await axiosInstance.post<OrdersDTO>("/orders", order)).data
}
export const deleteOrder = async (id: number): Promise<OrdersDTO> => {
	return (await axiosInstance.delete<OrdersDTO>("/orders/" + id)).data
}
export const editOrder = async (
	id: number,
	order: OrdersDTO,
): Promise<OrdersDTO> => {
	return (await axiosInstance.patch<OrdersDTO>("/orders/" + id, order)).data
}
