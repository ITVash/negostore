"use client"
import { useTelegram } from "@/shared/lib/providers"
import { cn } from "@/shared/lib/utils"
import React from "react"

interface ContainerProps {
	className?: string
}
export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
	children,
	className,
}) => {
	const { webApp } = useTelegram()
	if (!webApp) {
		return <div>Загрузка компонента...</div>
	}
	return (
		<div
			className={cn(
				"max-w-sm px-5 flex m-auto",
				`text-[#ffffff] text-[${webApp.themeParams.text_color}] flex-col max-h-screen`,
				className,
			)}>
			{children}
		</div>
	)
}
