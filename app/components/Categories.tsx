import type { Categories as CategoriesType } from "@/app/types/home";
import { ProductCardCarousel } from "@/components/ui/productCardCarousel";
import React from "react";

export default function Categories({
	categories,
}: { categories: CategoriesType }) {
	return (
		<div className="grid gap-8">
			{categories.items.map((category) => (
				<div key={category.id} className="grid">
					{category.subcategories.length > 0
						? category.subcategories.map(
								(subcategory) =>
									subcategory.products.length > 0 && (
										<div key={subcategory.id} className="grid gap-2">
											<strong className="text-2xl font-bold">
												{category.name}
											</strong>
											<section className="grid gap-2">
												<strong key={subcategory.id}>{subcategory.name}</strong>
												<ProductCardCarousel products={subcategory.products} />
											</section>
										</div>
									),
							)
						: category.products.length > 0 && (
								<section className="grid gap-2">
									<strong className="text-2xl font-bold">
										{category.name}
									</strong>
									<ProductCardCarousel products={category.products} />
								</section>
							)}
				</div>
			))}
		</div>
	);
}
