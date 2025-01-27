"use client"
import { Container, Loading } from "@/shared/components/shared"
import { Button } from "@/shared/components/ui/button"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs"
import { useTelegram } from "@/shared/lib/providers"
import { cn } from "@/shared/lib/utils"
import { useStore } from "@/shared/store"
import { useRouter } from "next/navigation"
import React from "react"

export default function StoreDetail({
	params: { id },
}: {
	params: { id: string }
}) {
	const { webApp } = useTelegram()
	const { fetchStoreName, storeName } = useStore()
	const router = useRouter()

	React.useEffect(() => {
		fetchStoreName(Number(id))
	}, [])
	React.useEffect(() => {
		if (webApp) {
			webApp.BackButton.isVisible = true

			webApp.onEvent("backButtonClicked", router.back)
		}
		return () => {
			if (webApp) {
				webApp.BackButton.isVisible = false
				webApp.offEvent("backButtonClicked", router.back)
			}
		}
	}, [])
	if (!webApp || !storeName) {
		return <Loading />
	}
	return (
		<Container className={cn(`text-[${webApp.themeParams.text_color}]`)}>
			<Tabs
				defaultValue='orders'
				className={cn(
					`text-[${webApp.themeParams.text_color}] bg-[${webApp.themeParams.bg_color}]`,
				)}>
				<TabsList
					className={cn(
						`text-[${webApp.themeParams.text_color}] bg-[${webApp.themeParams.bg_color}] grid w-full grid-cols-2`,
					)}>
					<TabsTrigger value='orders'>Счета Покупателей</TabsTrigger>
					<TabsTrigger value='stores'>Склад</TabsTrigger>
				</TabsList>
				<TabsContent value='orders'>
					Счета покупателей в разработке!!!
				</TabsContent>
				<TabsContent value='stores'>
					<Button>Внести товар на склад</Button>
					<Button>Приход товара</Button>
				</TabsContent>
			</Tabs>
		</Container>
	)
}
