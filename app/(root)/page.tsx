"use client"
import { Container } from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"
import { CreateUser } from "@/shared/lib/registerUser"
import React from "react"

export default function Home() {
	const { user, webApp } = useTelegram()
	React.useEffect(() => {
		if (user) {
			/* const userCreate = items.filter((item) => item.id_tg === user?.id)[0]
			if (!userCreate) {
      } */
			//fetchUser(user.id)
			CreateUser(user)
		}
		//fetchUser(454135208)
	}, [user])
	if (!webApp) {
		return <div>Загрузка...</div>
	}
	return <Container>привет</Container>
}

