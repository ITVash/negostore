import { prisma } from "@/prisma/prisma-client"
import { Orders } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const order = await prisma.orders.findMany({
			include: {
				storeHouse: true,
			},
		})
		if (!order) return NextResponse.json({ message: "Нет ни одного счета!" })
		return NextResponse.json(order)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}

export async function POST(req: NextRequest) {
	const data: Orders = await req.json()
	try {
		const order = await prisma.orders.create({ data })
		if (!order)
			return NextResponse.json(
				{ message: "Не получилось создать склад!" },
				{ status: 404 },
			)
		return NextResponse.json(order, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
