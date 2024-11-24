// SDK de Mercado Pago
import type { Cart } from "@/app/types/cart";
import { MP_ACCESS_TOKEN } from "@/lib/envs";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
// Agrega credenciales
export async function POST(request: Request) {
	const cart: Cart = await request.json();
	console.log("🚀 ~ POST ~ body:", cart);
	const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

	const preference = new Preference(client);

	const preferenceResponse = await preference.create({
		body: {
			additional_info: cart.documentId,
			items: cart.cart_products.map((product) => ({
				id: product.documentId,
				title: product.product.title,
				quantity: product.quantity,
				unit_price: product.product.price,
			})),
			purpose: "testing_integration",
			back_urls: {
				success: "https://www.tu-sitio/success",
				failure: "http://www.tu-sitio/failure",
				pending: "http://www.tu-sitio/pending",
			},
			auto_return: "approved",
		},
	});

	return NextResponse.json(preferenceResponse);
}
