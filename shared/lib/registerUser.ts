"use server"
import { prisma } from "@/prisma/prisma-client"
import { ITelegramUser } from "../@types"
import { useRouter } from "next/navigation"

export const CreateUser = async (user: ITelegramUser) => {
	const router = useRouter()
	try {
		if (user) {
			const manyUserTG = await prisma.user.findFirst({
				where: { id_tg: Number(user.id) },
			})
			const manyUserID = await prisma.user.findFirst({
				where: { id: Number(user.id) },
			})

			if (!manyUserTG && !manyUserID) {
				const data = await prisma.user.create({
					data: {
						id_tg: user.id,
						last_name: user.last_name,
						first_name: user.first_name,
						photo_url: user.photo_url!,
						username: user.username,
						role: "GUEST",
					},
				})
				router.push("/not-access")
				return data
			}
		}
	} catch (error) {
		console.error(error)
	}
}
