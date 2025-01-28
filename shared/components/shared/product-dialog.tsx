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

interface IProductDialogProps {
	className?: string
}

export const ProductDialog: React.FC<
	React.PropsWithChildren<IProductDialogProps>
> = ({ children, className }) => {
	return (
		<div className={cn("", className)}>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>Товар</DialogHeader>а тут уже само окно
					<DialogFooter>
						<Button>Сохранить</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
