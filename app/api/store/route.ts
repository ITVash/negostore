import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const store = await prisma.store.findMany({ include: { storeHouse: true } })
		if (!store) return NextResponse.json({ message: "Нет ни одного склада!" })
		return NextResponse.json(store)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
export async function POST(req: NextRequest) {
	try {
		const data = await req.json()
		const store = await prisma.store.create({
			data: {
				title: data.title,
				storeHouse: {
					create: data.storeHouse,
				},
			},
			include: { storeHouse: true },
		})
		if (!store)
			return NextResponse.json(
				{ message: "Не получилось создать склад!" },
				{ status: 404 },
			)
		return NextResponse.json(store, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
