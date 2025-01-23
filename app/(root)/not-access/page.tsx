import { Container, NotAccess } from "@/shared/components/shared"
import { useTelegram } from "@/shared/lib/providers"

export default function NotAccessPage() {
	const { webApp } = useTelegram()
	return (
		<Container
			className={`text-[#ffffff] text-[${webApp?.themeParams.text_color}] flex-col max-h-screen`}>
			<NotAccess />
		</Container>
	)
}
