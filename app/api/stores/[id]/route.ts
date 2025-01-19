import { prisma } from "@/prisma/prisma-client"
import { StoreHouse } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	__: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const store = await prisma.storeHouse.findFirst({
			where: { id: id },
			include: {
				orders: true,
				product: true,
				storeName: true,
			},
		})
		if (!store)
			return NextResponse.json(
				{
					message: "Склад не найден в базе данных!",
				},
				{ status: 404 },
			)
		return NextResponse.json(store, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const data = (await req.json()) as StoreHouse
		if (!id)
			return NextResponse.json({ message: "Не коректный ID" }, { status: 400 })
		const store = await prisma.storeHouse.findFirst({ where: { id: id } })
		if (!store) return NextResponse.json({ message: "Склад не был найден" })
		const storeUpdate = await prisma.storeHouse.update({
			where: { id: id },
			data,
		})
		return NextResponse.json(storeUpdate, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
export async function DELETE(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id")
		if (!id)
			return NextResponse.json({ message: "Не коректный ID" }, { status: 400 })
		await prisma.storeHouse.delete({ where: { id: Number(id) } })
		return NextResponse.json({ message: "Склад удален!" }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
