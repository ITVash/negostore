import { Orders, ProductRange, StoreHouse } from "@prisma/client"

export interface StoreDTO extends StoreHouse {
	products?: ProductRange[]
	orders?: Orders[]
}
