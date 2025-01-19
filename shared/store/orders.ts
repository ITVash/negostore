import { Orders } from "@prisma/client"
import { OrdersDTO } from "../services/dto/orders.dto"
import { Api } from "../services/api-client"
import { create } from "zustand"

export interface OrderState {
	loading: boolean
	error: boolean
	orders: Orders[]
	order?: Orders
	fetchOrder: (id: number) => Promise<void>
	fetchOrdersAll: () => Promise<void>
	fetchAddOrder: (order: OrdersDTO) => Promise<void>
	fetchEditOrder: (id: number, values: OrdersDTO) => Promise<void>
	fetchDelitOrder: (id: number) => Promise<void>
}
export const useOrders = create<OrderState>((set) => ({
	loading: false,
	error: false,
	orders: [],
	order: undefined,
	fetchOrder: async (id: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.orders.getOrder(id)
			set({ order: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchOrdersAll: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.orders.getAllOrders()
			set({ orders: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchAddOrder: async (order: OrdersDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.orders.addOrder(order)
			set((state) => ({
				orders: [...state.orders, data],
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	fetchEditOrder: async (id: number, values: OrdersDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.orders.editOrder(id, values)
			set((state) => ({
				orders: state.orders.map((itm) => {
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
	fetchDelitOrder: async (id: number) => {
		try {
			set({ loading: true, error: false })
			await Api.orders.deleteOrder(id)
			set((state) => ({
				orders: state.orders.filter((itm) => itm.id !== id),
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
