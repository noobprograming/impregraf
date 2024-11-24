import type {
	Product,
	ProductColor,
	ProductMaterial,
	ProductSize,
} from "./commons";

export interface Cart {
	cart_products: CartProduct[];
	documentId: string;
}

export interface CartProduct {
	documentId: string;
	title: string;
	product: Product;
	quantity: number;
	color: ProductColor;
	material: ProductMaterial;
	size: ProductSize;
	image: string;
}
