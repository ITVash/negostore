import { create } from "zustand"
import { StoreDTO } from "../services/dto/stores.dto"
import { Api } from "../services/api-client"
import { Store } from "@prisma/client"

export interface StoreState {
	loading: boolean
	error: boolean
	storeName: Store
	stores: StoreDTO[]
	store: StoreDTO
	fetchStoreName: (id: number) => Promise<void>
	fetchAllStores: () => Promise<void>
	fetchStore: (id: number) => Promise<void>
	fetchAddStore: (values: StoreDTO) => Promise<void>
	fetchEditStore: (id: number, values: StoreDTO) => Promise<void>
	fetchDelitStore: (id: number) => Promise<void>
}
export const useStore = create<StoreState>((set) => ({
	loading: false,
	error: false,
	storeName: {} as Store,
	stores: [],
	store: {} as StoreDTO,
	fetchStoreName: async (id: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.stores.storeName(id)
			set({ storeName: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	fetchAllStores: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.stores.getAllStores()
			set({ stores: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchStore: async (id: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.stores.getStore(id)
			set({ store: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchAddStore: async (values: StoreDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.stores.addStore(values)
			set((state) => ({
				stores: [...state.stores, data],
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchEditStore: async (id: number, values: StoreDTO) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.stores.editStore(id, values)
			set((state) => ({
				stores: state.stores.map((itm) => {
					if (itm.id === id) {
						return data
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
	fetchDelitStore: async (id: number) => {
		try {
			set({ loading: true, error: false })
			await Api.stores.deleteStore(id)
			set((state) => ({
				stores: state.stores.filter((itm) => itm.id !== id),
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
