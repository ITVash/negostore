"use client"
import React from "react"
import {
	Container,
	Header,
	Loading,
	NotAccess,
} from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"
import { CreateUser } from "@/shared/lib/registerUser"
import { useUser } from "@/shared/store"

export default function Home() {
	const { user, webApp } = useTelegram()
	const { usersStore, getMe, fetchUser, fetchUsersAll } = useUser()

	React.useEffect(() => {
		fetchUsersAll()
		console.log(usersStore)
	}, [])

	React.useEffect(() => {
		if (user) {
			const userCreate = usersStore.filter((item) => item.id_tg === user?.id)[0]
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
	if (!webApp || !user || !getMe!.role) {
		return <Loading />
	}
	return (
		<Container
			className={`text-[#ffffff] text-[${webApp?.themeParams.text_color}] flex-col max-h-screen`}>
			{(getMe && getMe.role === "ADMIN") ||
			(getMe && getMe.role === "USER") ||
			(getMe && getMe.role === "BOOKKEEPER") ? (
				<>
					<Header user={getMe!} />
				</>
			) : (
				<NotAccess />
			)}
		</Container>
	)
}

