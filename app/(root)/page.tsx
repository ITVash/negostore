"use client"
import { Container } from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"
import { CreateUser } from "@/shared/lib/registerUser"
import { useUser } from "@/shared/store"
import React from "react"

export default function Home() {
	const { user, webApp } = useTelegram()
	const { users, getMe, fetchUser, fetchUsersAll } = useUser()
	React.useEffect(() => {
		fetchUsersAll()
	}, [])

	React.useEffect(() => {
		if (user) {
			const userCreate = users.filter((item) => item.id_tg === user?.id)[0]
			if (!userCreate) {
				CreateUser(user)
			}
			fetchUser(user.id)
		}
		//fetchUser(454135208)
	}, [user])
	React.useEffect(() => {
		if (webApp && user) {
			webApp!.BackButton.isVisible = false
		}
	}, [])
	if (!webApp || !users || !getMe!.role) {
		return <div>Загрузка...</div>
	}
	return (
		<Container
			className={`text-[#ffffff] text-[${webApp?.themeParams.text_color}] flex-col max-h-screen`}>
			привет
		</Container>
	)
}
