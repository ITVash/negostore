import { prisma } from "@/prisma/prisma-client"
import { ProductRange } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const products = await prisma.productRange.findMany({
			include: {
				category: true,
				storeHouse: true,
			},
		})
		if (!products)
			return NextResponse.json({ message: "Нет ни одного товара!" })
		return NextResponse.json(products)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}

export async function POST(req: NextRequest) {
	const data: ProductRange = await req.json()
	try {
		const product = await prisma.productRange.create({ data })
		if (!product)
			return NextResponse.json(
				{ message: "Не получилось создать товар!" },
				{ status: 404 },
			)
		return NextResponse.json(product, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
