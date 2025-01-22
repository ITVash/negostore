import { cn } from "@/shared/lib/utils"
import React from "react"

interface IStoreProps {
	className?: string
	params: { id: string }
}

export const Store: React.FC<IStoreProps> = ({ className, params }) => {
	return <div className={cn("", className)}>Store {params.id}</div>
}
