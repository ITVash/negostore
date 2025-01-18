import { useTelegram } from "@/shared/lib/providers"
import { CreateUser } from "@/shared/lib/registerUser"
import Image from "next/image"
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
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			Привет!
		</div>
	)
}

