import { prisma } from "@/prisma/prisma-client"
import { User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const users = await prisma.user.findMany()
		if (!users)
			return NextResponse.json({ message: "Пользователи не были найдены" })
		return NextResponse.json(users)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}

export async function POST(req: NextRequest) {
	const data: User = await req.json()
	try {
		const user = await prisma.user.create({ data })
		if (!user)
			return NextResponse.json({ message: "Пользователь не был создан" })
		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json({ message: "Ошибка сервера", error })
	}
}
