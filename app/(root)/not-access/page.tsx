"use client"
import { Container, Loading, NotAccess } from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"

export default function NotAccessPage() {
	const { webApp } = useTelegram()
	if (!webApp) {
		return <Loading />
	}
	return (
		<Container
			className={`text-[#ffffff] text-[${webApp?.themeParams.text_color}] flex-col max-h-screen`}>
			<NotAccess />
		</Container>
	)
}
