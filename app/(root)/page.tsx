"use client"
import React from "react"
import {
	Container,
	Header,
	Loading,
	NotAccess,
	SelectStore,
} from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"
import { CreateUser } from "@/shared/lib/registerUser"
import { useUser } from "@/shared/store"
import { useRouter } from "next/navigation"

export default function Home() {
	const { user, webApp } = useTelegram()
	const { users, getMe, fetchUser, fetchUsersAll } = useUser()
	const router = useRouter()

	React.useEffect(() => {
		fetchUsersAll()
	}, [])

	React.useEffect(() => {
		if (user) {
			const userCreate = users.filter((item) => item.id_tg === user?.id)[0]
			if (!userCreate) {
				CreateUser(user)
				//router.push("/not-access")
			}
			const redirect = users.filter((item) => item.id_tg === user.id)
			if (redirect.length <= 0) router.push("/not-access")
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
					<SelectStore webApp={webApp} />
				</>
			) : (
				<NotAccess />
			)}
		</Container>
	)
}

