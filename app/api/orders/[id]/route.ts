import { prisma } from "@/prisma/prisma-client"
import { Orders } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	__: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const order = await prisma.orders.findFirst({
			where: { id: id },
			include: {
				storeHouse: true,
			},
		})
		if (!order)
			return NextResponse.json(
				{
					message: "Счет не найден в базе данных!",
				},
				{ status: 404 },
			)
		return NextResponse.json(order, { status: 200 })
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
		const data = (await req.json()) as Orders
		if (!id)
			return NextResponse.json({ message: "Не коректный ID" }, { status: 400 })
		const order = await prisma.orders.findFirst({ where: { id: id } })
		if (!order) return NextResponse.json({ message: "Счет не был найден" })
		const orderUpdate = await prisma.orders.update({
			where: { id: id },
			data,
		})
		return NextResponse.json(orderUpdate, { status: 200 })
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
		await prisma.orders.delete({ where: { id: Number(id) } })
		return NextResponse.json({ message: "Счет удален!" }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
