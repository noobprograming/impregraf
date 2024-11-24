import type { Category, Product } from "./commons";

export interface Home {
	hero: Hero;
	categories: Categories;
	products: Products;
}

export interface Products {
	title: string;
	items: Product[];
}

export interface Categories {
	items: Category[];
	title: string;
}

export interface Hero {
	title: string;
	banners: HeroBanner[];
}

export interface HeroBanner {
	title: string;
	subtitle: string;
	images: string[];
}
