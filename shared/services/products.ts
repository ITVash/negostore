import { ProductDTO } from "./dto/products.dto"
import { axiosInstance } from "./instance"

export const getAllProduct = async (): Promise<ProductDTO[]> => {
	return (await axiosInstance.get<ProductDTO[]>("/products")).data
}
export const getProduct = async (id: number): Promise<ProductDTO> => {
	return (await axiosInstance.get<ProductDTO>("/products/" + id)).data
}
export const addProduct = async (product: ProductDTO): Promise<ProductDTO> => {
	return (await axiosInstance.post<ProductDTO>("/products", product)).data
}
export const editProduct = async (
	id: number,
	product: ProductDTO,
): Promise<ProductDTO> => {
	return (await axiosInstance.patch<ProductDTO>("/products/" + id, product))
		.data
}
export const deleteProduct = async (id: number): Promise<ProductDTO> => {
	return (await axiosInstance.delete<ProductDTO>("/products/" + id)).data
}
