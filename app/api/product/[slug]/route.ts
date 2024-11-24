import { NextResponse } from "next/server";
import { StrapiDataService } from "../../strapi";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } },
) {
	const _product = await new StrapiDataService().getProductBySlug(params.slug);
	const product = _product[0];

	const breadcrumbItems = [
		{
			url: `/categorias/${product.category.name}`,
			name: product.category.name,
		},
	];

	if (product.subcategory?.id) {
		breadcrumbItems.push({
			url: `/subcategorias/${product.subcategory.name}`,
			name: product.subcategory.name,
		});
	}

	return NextResponse.json({
		product: product,
		breadcrumbItems,
	});
}
