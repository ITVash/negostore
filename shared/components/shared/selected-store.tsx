"use client"
import React from "react"
import { cn } from "@/shared/lib/utils"
import { Container } from "./container"
import { Button } from "../ui/button"
import { IWebApp } from "@/shared/@types"
import { Loading } from "./loading"
import { useStore } from "@/shared/store"
import { useRouter } from "next/navigation"

interface ISelectStoreProps {
	className?: string
	webApp?: IWebApp
}

export const SelectStore: React.FC<ISelectStoreProps> = ({
	className,
	webApp,
}) => {
	const { fetchStoreName } = useStore()
	const router = useRouter()
	const handleClick = (id: number) => {
		router.push("/storehouse/" + id)
	}
	if (!webApp) return <Loading />
	return (
		<Container
			className={cn("items-center justify-center h-screen", className)}>
			<h4>С каким складом работаем?</h4>
			<Button className={cn(` mb-4 mt-4`)} onClick={() => handleClick(1)}>
				ИП Новиков
			</Button>
			<Button className={cn(`mb-4`)} onClick={() => handleClick(2)}>
				ТД Негоциант
			</Button>
		</Container>
	)
}
