import { Category, ProductRange } from "@prisma/client"

export interface ProductDTO extends ProductRange {
	category?: Category
}
