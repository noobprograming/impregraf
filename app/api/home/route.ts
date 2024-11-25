import type { Category, Subcategory } from "@/app/types/commons";
import { StrapiDataService } from "@/app/api/strapi";
import { NextResponse } from "next/server";
import { STRAPI_URL } from "@/lib/envs";

export async function GET() {
	const strapiService = new StrapiDataService();
	const categories = (await strapiService.getCategories()) || [];
	console.log("🚀 ~ GET ~ categories:", categories);
	const products = (await strapiService.getProducts()) || [];
	console.log("🚀 ~ GET ~ products:", products);
	const subcategories = (await strapiService.getSubcategories()) || [];
	console.log("🚀 ~ GET ~ subcategories:", subcategories);
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
	console.log("🚀 ~ GET ~ categoriesUpdated:", categoriesUpdated);

	return NextResponse.json({
		hero: {
			banners: [
				{
					title:
						"Personalizamos lapiceras para eventos empresariales, al mejor precio y calidad del mercado",
					subtitle: "Distintos colores y diseño a tu conveniencia!",
					images: [`${STRAPI_URL}/uploads/trucker_verde_cea6f6e68a.jpg`],
				},
				{
					title: "Personalización de productos para tu empresa",
					subtitle:
						"Remeras, ropa de trabajo, camisetas, gorras, tazas, lapiceras, etc.",
					images: [
						`${STRAPI_URL}/uploads/trucker_verde_cea6f6e68a.jpg`,
						`${STRAPI_URL}/uploads/D_NQ_NP_764715_MLA_46135730313_052021_O_a1bb81b7ad.webp`,
						`${STRAPI_URL}/uploads/images_1_85b6091999.jpeg`,
						`${STRAPI_URL}/uploads/D_NQ_NP_602753_MLA_46119737407_052021_O_02b0f2dd62.webp`,
					],
				},
				{
					title: "Personalización de productos para tu empresa",
					subtitle:
						"Remeras, ropa de trabajo, camisetas, gorras, tazas, lapiceras, etc.",
					images: [
						`${STRAPI_URL}/uploads/trucker_verde_cea6f6e68a.jpg`,
						`${STRAPI_URL}/uploads/D_NQ_NP_764715_MLA_46135730313_052021_O_a1bb81b7ad.webp`,
						`${STRAPI_URL}/uploads/images_1_85b6091999.jpeg`,
						`${STRAPI_URL}/uploads/D_NQ_NP_602753_MLA_46119737407_052021_O_02b0f2dd62.webp`,
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
