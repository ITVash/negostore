import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const store = await prisma.store.findMany({ include: { storeHouse: true } })
		if (!store) return NextResponse.json({ message: "Нет ни одного склада!" })
		return NextResponse.json(store)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
