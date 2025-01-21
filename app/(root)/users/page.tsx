"use client"
import { Container, Loading } from "@/shared/components/shared"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table"
import { useToast } from "@/shared/hooks/use-toast"
import { useTelegram } from "@/shared/lib/providers"
import { cn } from "@/shared/lib/utils"
import { useUser } from "@/shared/store"
import { UserRole } from "@prisma/client"
import { useRouter } from "next/navigation"
import React from "react"

export default function EditUsers() {
	const { toast } = useToast()
	const { webApp } = useTelegram()
	const router = useRouter()
	const { users, fetchEditUser, fetchUsersAll } = useUser()
	const onChangeHandle = async (
		id: number,
		value: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const role = value.target.value
		if (role === "USER") await fetchEditUser(id, UserRole.USER)
		if (role === "ADMIN") await fetchEditUser(id, UserRole.ADMIN)
		if (role === "GUEST") await fetchEditUser(id, UserRole.GUEST)
		if (role === "BOOKKEEPER") await fetchEditUser(id, UserRole.BOOKKEEPER)
		toast({ description: "Права пользователя изменены!" })
	}
	React.useEffect(() => {
		fetchUsersAll()
	}, [])
	/* React.useEffect(() => {
		console.log(items)
	}, [items]) */
	React.useEffect(() => {
		if (webApp) {
			webApp.BackButton.isVisible = true

			webApp.onEvent("backButtonClicked", router.back)
		}
		return () => {
			if (webApp) {
				webApp.BackButton.isVisible = false
				webApp.offEvent("backButtonClicked", router.back)
			}
		}
	}, [])
	if (!webApp && !users) {
		return <Loading />
	}
	return (
		<Container
			className={cn(
				`text-[${webApp?.themeParams.text_color}] mt-4 flex flex-col`,
			)}>
			<Table>
				<TableCaption>Список пользователей!</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Имя</TableHead>
						<TableHead>Фамилия</TableHead>
						<TableHead>Роль</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((item, id) => (
						<TableRow key={item.username + id}>
							<TableCell>{item.first_name}</TableCell>
							<TableCell>{item.last_name}</TableCell>
							<TableCell>
								<select
									onChange={(e) => onChangeHandle(item.id, e)}
									className={`bg-[transparent] hover:bg-transparent active:bg-blue-500 focus:bg-blue-500 text-[${
										webApp!.themeParams.text_color
									}]`}
									defaultValue={item.role}>
									<option key={item.id + "ADMIN"} value='ADMIN'>
										Админ
									</option>
									<option key={item.id + "BOOKKEEPER"} value='BOOKKEEPER'>
										Бухгалтер
									</option>
									<option key={item.id + "USER"} value='USER'>
										Пользователь
									</option>
									<option key={item.id + "GUEST"} value='GUEST'>
										Гость
									</option>
								</select>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	)
}
