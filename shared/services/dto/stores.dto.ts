import { Orders, ProductRange, Store, StoreHouse } from "@prisma/client"

export interface StoreDTO extends StoreHouse {
	products?: ProductRange[]
	orders?: Orders[]
}
export interface StoreNameDTO extends Store {
	storeHouse?: StoreHouse[]
}
