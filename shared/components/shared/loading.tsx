import { cn } from "@/shared/lib/utils"
import { LoaderCircle } from "lucide-react"
import React from "react"
import Logo from "@/public/favicon.svg"
import Image from "next/image"

interface LoadingProps {
	className?: string
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
	return (
		<div
			className={cn(
				"flex flex-col w-[100%] h-screen items-center justify-center m-auto",
				className,
			)}>
			<Image
				src={Logo}
				width={150}
				height={150}
				alt='Logo'
				className='bg-white rounded-md mb-8 animate-bounce'
			/>
			<LoaderCircle className='animate-spin text-sky-800' size={48} />
		</div>
	)
}
