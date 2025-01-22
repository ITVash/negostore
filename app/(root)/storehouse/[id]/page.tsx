import { Container, Loading } from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"
import { cn } from "@/shared/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"

export default function StoreDetail({
	params: { id },
}: {
	params: { id: string }
}) {
	const { webApp } = useTelegram()
	const router = useRouter()

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
	if (!webApp) {
		return <Loading />
	}
	return (
		<Container className={cn(`text-[${webApp.themeParams.text_color}]`)}>
			Store {id}
		</Container>
	)
}
