import type { Products } from "../types/home";
import { ProductCardCarousel } from "@/components/ui/productCardCarousel";

export default function Mvp({ products }: { products: Products }) {
	return (
		<div className="grid gap-4">
			<h2 className="text-primary text-lg font-bold md:text-3xl">
				{products.title}
			</h2>
			<ProductCardCarousel products={products.items} />
		</div>
	);
}
