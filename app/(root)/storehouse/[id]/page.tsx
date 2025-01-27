"use client"
import { Container, Loading } from "@/shared/components/shared"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs"
import { useTelegram } from "@/shared/lib/providers"
import { cn } from "@/shared/lib/utils"
import { useStore } from "@/shared/store"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export default function StoreDetail({
	params: { id },
}: {
	params: { id: string }
}) {
	const { webApp } = useTelegram()
	const { fetchStoreName, storeName } = useStore()
	const [searchInput, setSearchInput] = React.useState<string>("")
	const router = useRouter()

	const searchHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	const delitSearchInput = () => {
		setSearchInput("")
	}

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
				<TabsContent value='stores' className='flex flex-col justify-center'>
					<div className='flex justify-between mt-3'>
						<Button>Добавить товар</Button>
						<Button>Приход товара</Button>
					</div>
					<div className={cn("flex w-full relative items-center mt-4 mb-2")}>
						<Search
							className={cn("text-gray-500 absolute left-[5px] z-10")}
							size={16}
						/>
						<Input
							type='text'
							className='w-full pl-6 pr-6'
							placeholder='Название организации...'
							value={searchInput}
							onChange={searchHadler}
						/>
						<X
							className={cn(
								"absolute right-[5px] cursor-pointer invisible",
								searchInput.length > 0 && "visible",
							)}
							size={16}
							onClick={delitSearchInput}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</Container>
	)
}
