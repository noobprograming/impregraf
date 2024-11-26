"use client";
import { Cart } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import Link from "next/link";
import React from "react";

const WHATSAPP_NUMBER = "+598921351";

export default function Success({ params }: { params: { cart: string } }) {
	const { refreshCart } = useStore();
	const [text, setText] = React.useState("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		const fetchCart = async () => {
			const payedCart = await refreshCart(params.cart);
			const _text = `Mi orden de compra es ${payedCart.documentId} y los productos son: ${payedCart.cart_products
				?.map((product) => `${product.product.title} x ${product.quantity}`)
				.join(", ")}.`;
			setText(_text);
		};
		fetchCart();
	}, []);

	return (
		<div className="grid place-content-start text-center justify-center  h-screen gap-8 mt-8">
			<h2 className="text-3xl font-bold">Gracias por tu compra!</h2>
			<p>
				Tu número de orden es{" "}
				<span className="font-bold bg-gray-200 p-2 rounded-md">
					{params.cart}
				</span>
			</p>
			<p>
				Contactate con nosotros al whatsapp y pasa el detalle de tu orden para
				hacer las consultas que tengas
			</p>
			<div>
				<Button className="w-fit" variant="outline">
					<Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}>
						Comunicarte al whatsapp
					</Link>
				</Button>
			</div>
		</div>
	);
}
