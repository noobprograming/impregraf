"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import CartProductCard from "@/components/ui/cartProductCard";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/ui/productCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoConfig } from "mercadopago";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InternalService } from "@/app/api/internal";
import type { Cart } from "@/app/types/cart";
import { MP_PUBLIC_KEY } from "@/lib/envs";

export default function Checkout({ params }: { params: { cart: string } }) {
	const { refreshCart, cart } = useStore();
	const [total, setTotal] = React.useState(0);
	const [totalProducts, setTotalProducts] = React.useState(0);
	const [preferenceId, setPreferenceId] = React.useState("");
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		refreshCart(params.cart);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (cart.cart_products?.length > 0) {
			const _total = cart.cart_products?.reduce(
				(acc, product) => acc + product.product.price * product.quantity,
				total,
			);
			setTotal(_total);
			const _totalProducts = cart.cart_products?.reduce(
				(acc, product) => acc + product.quantity,
				0,
			);
			setTotalProducts(_totalProducts);
			fetchMp(cart);
		}
		initMercadoPago(MP_PUBLIC_KEY);
	}, [cart]);

	const fetchMp = async (cart: Cart) => {
		const internalSrv = new InternalService();
		const res = await internalSrv.createMpPreference(cart);
		setPreferenceId(res.id);
	};

	return (
		<div className="grid mt-4 sm:mt-8 gap-4">
			<p className="text-3xl font-bold">Checkout</p>
			<Separator />
			<div className="grid gap-4">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<p className="text-xl font-bold">Productos ({totalProducts})</p>
						</AccordionTrigger>
						<AccordionContent className="grid gap-4">
							{cart.cart_products?.map((product) => (
								<React.Fragment key={product.documentId}>
									<CartProductCard cartProduct={product} index={0} />
									<Separator />
								</React.Fragment>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="grid gap-4">
				<p className="text-xl font-bold">Metodo de entrega:</p>
				<RadioGroup defaultValue="local">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="local" id="local" />
						<Label htmlFor="local" className="text-md font-regular">
							Retira en local
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="delivery" id="delivery" />
						<Label htmlFor="delivery" className="text-md font-regular">
							Entrega a domicilio
						</Label>
					</div>
				</RadioGroup>
			</div>
			<Separator />
			<div>
				<p className="text-xl font-bold">Total: ${total}</p>
			</div>
			{preferenceId && (
				<Wallet
					initialization={{ preferenceId }}
					customization={{ texts: { valueProp: "smart_option" } }}
				/>
			)}
		</div>
	);
}
