import { prisma } from "@/prisma/prisma-client"
import { UserRole } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	__: NextRequest,
	{ params }: { params: { id_tg: string } },
) {
	try {
		const id = Number(params.id_tg)
		const user = await prisma.user.findFirst({
			where: { id_tg: id },
		})
		if (!user)
			return NextResponse.json(
				{
					message: "Пользователь не был найден в базе данных!",
				},
				{ status: 404 },
			)
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id_tg: string } },
) {
	try {
		const id = Number(params.id_tg)
		const data = (await req.json()) as { role: UserRole }
		if (!id)
			return NextResponse.json({ message: "Не коректный ID" }, { status: 400 })
		const user = await prisma.user.findFirst({ where: { id: id } })
		if (!user)
			return NextResponse.json({ message: "Пользователь не был найден" })
		const userUpdate = await prisma.user.update({
			where: { id: id },
			data: {
				role: data.role,
			},
		})
		return NextResponse.json(userUpdate)
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
		await prisma.user.delete({ where: { id: Number(id) } })
		return NextResponse.json(
			{ message: "Пользователь удален" },
			{ status: 200 },
		)
	} catch (error) {
		return NextResponse.json(
			{ message: "Ошибка сервера", error },
			{ status: 500 },
		)
	}
}
