import type { Category, Subcategory } from "@/app/types/commons";
import { StrapiDataService } from "@/app/api/strapi";
import { NextResponse } from "next/server";

export async function GET() {
	const categories = await new StrapiDataService().getCategories();
	const products = await new StrapiDataService().getProducts();
	const subcategories = await new StrapiDataService().getSubcategories();
	const categoriesUpdated: Category[] = [];

	for (const category of categories) {
		const hasSubCategory = subcategories.find(
			(subcategory) => subcategory.id === category.subcategories?.[0]?.id,
		);

		if (hasSubCategory) {
			category.subcategories = [hasSubCategory];
		}

		categoriesUpdated.push(category);
	}

	return NextResponse.json({
		hero: {
			banners: [
				{
					title:
						"Personalizamos lapiceras para eventos empresariales, al mejor precio y calidad del mercado",
					subtitle: "Distintos colores y diseño a tu conveniencia!",
					images: [
						"http://localhost:1337/uploads/trucker_verde_cea6f6e68a.jpg",
					],
				},
				{
					title: "Personalización de productos para tu empresa",
					subtitle:
						"Remeras, ropa de trabajo, camisetas, gorras, tazas, lapiceras, etc.",
					images: [
						"http://localhost:1337/uploads/trucker_verde_cea6f6e68a.jpg",
						"http://localhost:1337/uploads/D_NQ_NP_764715_MLA_46135730313_052021_O_a1bb81b7ad.webp",
						"http://localhost:1337/uploads/images_1_85b6091999.jpeg",
						"http://localhost:1337/uploads/D_NQ_NP_602753_MLA_46119737407_052021_O_02b0f2dd62.webp",
					],
				},
				{
					title: "Personalización de productos para tu empresa",
					subtitle:
						"Remeras, ropa de trabajo, camisetas, gorras, tazas, lapiceras, etc.",
					images: [
						"http://localhost:1337/uploads/trucker_verde_cea6f6e68a.jpg",
						"http://localhost:1337/uploads/D_NQ_NP_764715_MLA_46135730313_052021_O_a1bb81b7ad.webp",
						"http://localhost:1337/uploads/images_1_85b6091999.jpeg",
						"http://localhost:1337/uploads/D_NQ_NP_602753_MLA_46119737407_052021_O_02b0f2dd62.webp",
					],
				},
			],
		},
		products: {
			title: "Productos destacados",
			items: products,
		},
		categories: {
			items: categoriesUpdated,
			title: "Nuestras categorías",
		},
	});
}