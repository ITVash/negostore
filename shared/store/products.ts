import { ProductRange } from "@prisma/client"
import { ProductDTO } from "../services/dto/products.dto"
import { create } from "zustand"
import { Api } from "../services/api-client"

export interface ProductState {
	loading: boolean
	error: boolean
	products: ProductRange[]
	product?: ProductRange
	fetchAllProducts: () => Promise<void>
	fetchProduct: (id: number) => Promise<void>
	fetchAddProduct: (values: ProductDTO) => Promise<void>
	fetchEditProduct: (id: number, values: ProductDTO) => Promise<void>
	fetchDelitProduct: (id: number) => Promise<void>
}
export const useProducts = create<ProductState>((set) => ({
	loading: false,
	error: false,
	products: [],
	product: {} as ProductRange,
	fetchAllProducts: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.products.getAllProduct()
			set({ products: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchProduct: async (id: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.products.getProduct(id)
			set({ product: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchAddProduct: async (values: ProductDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.products.addProduct(values)
			set((state) => ({
				products: [...state.products, data],
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchEditProduct: async (id: number, values: ProductDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.products.editProduct(id, values)
			set((state) => ({
				products: state.products.map((itm) => {
					if (itm.id === id) {
						itm = data
					}
					return itm
				}),
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchDelitProduct: async (id: number) => {
		try {
			set({ loading: true, error: false })
			await Api.products.deleteProduct(id)
			set((state) => ({
				products: state.products.filter((itm) => itm.id !== id),
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
