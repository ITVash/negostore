import { cn } from "@/shared/lib/utils"
import React from "react"
import { Container } from "./container"
import { Button } from "../ui/button"

interface ISelectStoreProps {
	className?: string
}

export const SelectStore: React.FC<ISelectStoreProps> = ({ className }) => {
	return (
		<Container className={cn("items-center justify-center")}>
			<h4>С каким складом работаем?</h4>
			<Button>ИП Новиков</Button>
			<Button>ТД Негоциант</Button>
		</Container>
	)
}
