import { cn } from "@/shared/lib/utils"
import React from "react"

/* interface IStoreProps {
	className?: string
	params?: { id: string }
}
 */
/* export const StoreDetail: React.FC<IStoreProps> = ({ className, params }) => {
	return <div className={cn("", className)}>Store {params?.id}</div>
} */

export default function StoreDetail({
	params: { id },
}: {
	params: { id: string }
}) {
	return <div className={cn("")}>Store {id}</div>
}
