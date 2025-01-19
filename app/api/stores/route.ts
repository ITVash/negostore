import { prisma } from "@/prisma/prisma-client"
import { StoreHouse } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const store = await prisma.storeHouse.findMany({
			include: {
				product: true,
				orders: true,
			},
		})
		if (!store) return NextResponse.json({ message: "Нет ни одного склада!" })
		return NextResponse.json(store)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}

export async function POST(req: NextRequest) {
	const data: StoreHouse = await req.json()
	try {
		const store = await prisma.storeHouse.create({ data })
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
