import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { TelegramProvider } from "@/shared/lib/providers"
import { Toaster } from "@/shared/components/ui/toaster"

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
})
export const metadata: Metadata = {
	title: "ТД Негоциант:Склад",
	description: "Программа для складского учета!",
	icons: {
		icon: "./favicon.svg",
		shortcut: "./favicon.svg",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning={true}>
			<body className={nunito.className} suppressHydrationWarning={true}>
				<TelegramProvider>{children}</TelegramProvider>
				<Toaster />
			</body>
		</html>
	)
}

