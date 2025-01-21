import { User, UserRole } from "@prisma/client"
import { create } from "zustand"
import { Api } from "../services/api-client"

export interface UserState {
	loading: boolean
	error: boolean
	users: User[]
	getMe?: User
	fetchUser: (id_tg: number) => Promise<void>
	fetchUsersAll: () => Promise<void>
	fetchEditUser: (id: number, values: UserRole) => Promise<void>
	fetchDelitUser: (id: number) => Promise<void>
}
export const useUser = create<UserState>((set) => ({
	loading: true,
	error: false,
	users: [],
	getMe: {} as User,
	fetchUser: async (id_tg: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.users.getMe(id_tg)
			set({ getMe: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchUsersAll: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.users.getAllUsers()
			set({ users: data })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	fetchEditUser: async (id: number, values: UserRole) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.users.editUser(id, values)
			set((state) => ({
				loading: true,
				error: false,
				users: state.users.map((itm) => {
					if (itm.id === id) {
						itm.role = data.role
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
	fetchDelitUser: async (id: number) => {
		try {
			set({ loading: true, error: false })
			await Api.users.delitUser(id)
			set((state) => ({
				loading: true,
				error: false,
				users: state.users.filter((itm) => itm.id !== id),
			}))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
