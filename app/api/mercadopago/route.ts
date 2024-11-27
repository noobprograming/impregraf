// SDK de Mercado Pago
import type { Cart } from "@/app/types/cart";
import { PayType } from "@/app/types/checkout";
import { BASE_URL, MP_ACCESS_TOKEN } from "@/lib/envs";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
// Agrega credenciales
export async function POST(request: Request) {
	const { cart, type }: { cart: Cart; type: PayType } = await request.json();
	const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
	const preference = new Preference(client);
	console.log("🚀 ~ POST ~ preference:", preference);

	const preferenceResponse = await preference.create({
		body: {
			additional_info: cart.documentId,
			items: cart.cart_products.map((product) => ({
				id: product.documentId,
				title: product.product.title,
				quantity: product.quantity,
				unit_price:
					type === PayType.Total
						? product.product.price
						: product.product.price * 0.5,
			})),
			back_urls: {
				success: `${BASE_URL}/checkout/${cart.documentId}/success`,
				failure: `${BASE_URL}/checkout/${cart.documentId}/failure`,
				pending: `${BASE_URL}/checkout/${cart.documentId}/pending`,
			},
		},
	});

	return NextResponse.json(preferenceResponse);
}
