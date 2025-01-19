import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	__: NextRequest,
	{ params }: { params: { slug: string } },
) {
	try {
		const store = await prisma.store.findFirst({
			where: { id: Number(params.slug) },
			include: {
				storeHouse: true,
			},
		})
		if (!store) return NextResponse.json({ message: "Склад не был найден" })
		return NextResponse.json(store, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
