import { cn } from "@/shared/lib/utils"
import React from "react"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Container } from "./container"
import { Loading } from "./loading"
import { useTelegram } from "@/shared/lib/providers"

interface IProductDialogProps {
	className?: string
}

export const ProductDialog: React.FC<
	React.PropsWithChildren<IProductDialogProps>
> = ({ children, className }) => {
	const { webApp } = useTelegram()
	if (!webApp) {
		return <Loading />
	}
	return (
		<Container
			className={cn(`text-[${webApp.themeParams.text_color}]`, className)}>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>Товар</DialogHeader>а тут уже само окно
					<DialogFooter>
						<Button>Сохранить</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Container>
	)
}
