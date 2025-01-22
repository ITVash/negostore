import { cn } from "@/shared/lib/utils"
import React from "react"
import { Container } from "./container"
import { Button } from "../ui/button"
import { IWebApp } from "@/shared/@types"
import { Loading } from "./loading"

interface ISelectStoreProps {
	className?: string
	webApp?: IWebApp
}

export const SelectStore: React.FC<ISelectStoreProps> = ({
	className,
	webApp,
}) => {
	if (!webApp) return <Loading />
	return (
		<Container className={cn("items-center justify-center h-screen")}>
			<h4>С каким складом работаем?</h4>
			<Button className={cn(` mb-4 mt-4`)}>ИП Новиков</Button>
			<Button className={cn(`mb-4`)}>ТД Негоциант</Button>
		</Container>
	)
}
