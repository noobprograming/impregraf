import type { Product } from "./commons";

export interface ProductPage {
	product: Product;
	breadcrumbItems: BreadcrumbItem[];
}

export interface BreadcrumbItem {
	url: string;
	name: string;
}
