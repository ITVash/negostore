import { cn } from "@/shared/lib/utils"
import React from "react"
import {
	Dialog,
	DialogClose,
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
		<Container className={cn(`text-[#FFFFFF]`, className)}>
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className='bg-gray-100 w-full h-full'>
					<DialogHeader>Товар</DialogHeader>а тут уже само окно
					<DialogFooter>
						<DialogClose asChild>
							<Button>Сохранить</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Container>
	)
}
