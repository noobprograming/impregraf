export interface Category {
	id: string;
	name: string;
	key: string;
	subcategories: Subcategory[];
	products: Product[];
}

export interface Subcategory {
	id: string;
	name: string;
	products: Product[];
}

export interface Product {
	documentId: string;
	id: string;
	title: string;
	photos: Photo[];
	price: number;
	description: string;
	sizes: ProductSize[];
	colors: ProductColor[];
	material: ProductMaterial;
	category: Category;
	subcategory: Subcategory;
}

export interface ProductMaterial {
	documentId: string;
	id: number;
	name: string;
	key: string;
}

export interface ProductColor {
	documentId: string;
	id: number;
	color: string;
	key: string;
	value: string;
}

export interface ProductSize {
	documentId: string;
	id: number;
	name: string;
	key: string;
}

export interface Photo {
	url: string;
}

export enum IconType {
	List = "list",
	Close = "close",
	ShoppingCart = "shopping-cart",
	Trash = "trash",
}
