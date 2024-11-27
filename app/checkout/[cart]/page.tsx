"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import CartProductCard from "@/components/ui/cartProductCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { InternalService } from "@/app/api/internal";
import type { Cart } from "@/app/types/cart";
import { MP_PUBLIC_KEY } from "@/lib/envs";
import { PayType } from "@/app/types/checkout";

export default function Checkout({ params }: { params: { cart: string } }) {
	const { refreshCart, cart } = useStore();
	const [total, setTotal] = React.useState(0);
	const [totalProducts, setTotalProducts] = React.useState(0);
	const [totalPreferenceId, setTotalPreferenceId] = React.useState("");
	const [senaPreferenceId, setSenaPreferenceId] = React.useState("");
	const internalSrv = new InternalService();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		refreshCart(params.cart);
		initMercadoPago(MP_PUBLIC_KEY);
	}, []);

	React.useEffect(() => {
		if (cart.cart_products?.length > 0) {
			const cartProducts = cart.cart_products;
			const _total = cartProducts?.reduce(
				(acc, product) => acc + product.product.price * product.quantity,
				0,
			);
			setTotal(_total);
			const _totalProducts = cartProducts?.reduce(
				(acc, product) => acc + product.quantity,
				0,
			);
			setTotalProducts(_totalProducts);
			fetchTotalPreference();
		}
	}, [cart]);

	const fetchTotalPreference = async () => {
		const total = await internalSrv.createMpPreference(cart, PayType.Total);
		setTotalPreferenceId(total.id);
		setSenaPreferenceId("");
	};

	const fetchSenaPreference = async () => {
		console.log("🚀 ~ fetchSenaPreference ~ cart:", cart);
		const sena = await internalSrv.createMpPreference(cart, PayType.Sena);
		setSenaPreferenceId(sena.id);
		setTotalPreferenceId("");
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
			<Accordion type="single" collapsible defaultValue="item-1">
				<AccordionItem value="item-1">
					<AccordionTrigger onClick={() => fetchTotalPreference()}>
						<p className="text-xl font-bold">Pagar total: ${total}</p>
					</AccordionTrigger>
					<AccordionContent className="grid gap-4">
						{totalPreferenceId && (
							<Wallet
								initialization={{ preferenceId: totalPreferenceId }}
								customization={{ texts: { valueProp: "smart_option" } }}
							/>
						)}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger onClick={() => fetchSenaPreference()}>
						<p className="text-xl font-bold">Pagar seña: ${total * 0.5}</p>
					</AccordionTrigger>
					<AccordionContent className="grid gap-4">
						{senaPreferenceId && (
							<Wallet
								initialization={{ preferenceId: senaPreferenceId }}
								customization={{ texts: { valueProp: "smart_option" } }}
							/>
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
