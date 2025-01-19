import { Orders, StoreHouse } from "@prisma/client"

export interface OrdersDTO extends Orders {
	storeHouse?: StoreHouse[]
}
