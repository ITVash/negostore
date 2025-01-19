import { prisma } from "@/prisma/prisma-client"
import { ProductRange } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	__: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const product = await prisma.productRange.findFirst({
			where: { id: id },
			include: {
				category: true,
				storeHouse: true,
			},
		})
		if (!product)
			return NextResponse.json(
				{
					message: "Товар не найден в базе данных!",
				},
				{ status: 404 },
			)
		return NextResponse.json(product, { status: 200 })
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
		const data = (await req.json()) as ProductRange
		if (!id)
			return NextResponse.json({ message: "Не коректный ID" }, { status: 400 })
		const product = await prisma.productRange.findFirst({ where: { id: id } })
		if (!product)
			return NextResponse.json({ message: "Пользователь не был найден" })
		const productUpdate = await prisma.productRange.update({
			where: { id: id },
			data,
		})
		return NextResponse.json(productUpdate, { status: 200 })
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
		await prisma.productRange.delete({ where: { id: Number(id) } })
		return NextResponse.json({ message: "Товар удален!" }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
