"use client";

import { IconType } from "@/app/types/commons";
import type { CartProduct, Cart as CartType } from "@/app/types/cart";
import Icon from "@/components/ui/icon";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { StrapiDataService } from "@/app/api/strapi";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CartProductCard from "@/components/ui/cartProductCard";

export default function Cart() {
	const [cookies] = useCookies();
	const { cart, refreshCart } = useStore();
	const router = useRouter();

	const finishPurchase = async () => {
		router.push(`/checkout/${cart.documentId}`);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		refreshCart(cookies.cart);
	}, []);

	return (
		<Popover>
			<PopoverTrigger className="flex gap-1 cursor-pointer shadow-md p-3 rounded-full items-center">
				<Icon icon={IconType.ShoppingCart} size={24} />
				<p className="text-xs font-semibold">{cart.cart_products?.length}</p>
			</PopoverTrigger>
			<PopoverContent className="relative w-auto content-start h-fit mr-4 grid gap-4 overflow-auto max-h-96 p-4">
				{cart.cart_products?.length ? (
					cart.cart_products.map((cartProduct, index) => (
						<React.Fragment key={cartProduct.documentId}>
							<CartProductCard cartProduct={cartProduct} index={index} />
							<Separator />
						</React.Fragment>
					))
				) : (
					<p>Aún no agregaste productos al carrito</p>
				)}
				<div className="sticky bg-white bottom-0 w-full">
					<Button
						className="w-full"
						variant="default"
						type="button"
						onClick={finishPurchase}
					>
						Finalizar compra
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
