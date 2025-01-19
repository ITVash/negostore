"use  client"
import { cn } from "@/shared/lib/utils"
import React from "react"
import { ITelegramUser } from "@/shared/@types"
import Image from "next/image"
import { Container } from "@/shared/components/shared"
import { Button } from "@/shared/components/ui/button"
import { Menu } from "lucide-react"
import { User } from "@prisma/client"
interface HeaderProps {
	className?: string
	user: User
}

export const Header: React.FC<HeaderProps> = ({ className, user }) => {
	return (
		<div
			className={cn(
				"h-12 -mx-5 border-b-sky-900 border-b border-solid mt-2 mb-2",
				className,
			)}>
			<Container className={cn("flex justify-between items-center")}>
				<>
					{(user && user.role === "ADMIN") || user.role === "BOOKKEEPER" ? (
						<div>Ты в команде!</div>
					) : (
						<></>
					)}
				</>
				<div className='mt-2'>
					{user && user.photo_url && (
						<div className='flex justify-between items-center'>
							<Image
								src={user.photo_url!}
								alt={user.username}
								width={25}
								height={25}
								className='rounded-xl mr-2'
							/>{" "}
							{user.first_name}
						</div>
					)}
				</div>
			</Container>
		</div>
	)
}
