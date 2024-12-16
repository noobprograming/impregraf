import { StrapiDataService } from "@/app/api/strapi";
import type { CartProduct } from "@/app/types/cart";
import { IconType } from "@/app/types/commons";
import { useStore } from "@/lib/store";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import Image from "next/image";
import Icon from "./icon";
import { Badge } from "./badge";
import { Label } from "./label";
import { Input } from "./input";

export default function CartProductCard({
	cartProduct,
	index,
}: { cartProduct: CartProduct; index: number }) {
	const strapiService = new StrapiDataService();
	const { cart, refreshCart } = useStore();
	const [cookies] = useCookies();
	const [showDelete, setShowDelete] = React.useState<number | null>(null);

	const removeCartProduct = async (cartProduct: CartProduct) => {
		await strapiService.deleteCartProduct(cartProduct.documentId);
		refreshCart(cookies.cart);
		toast.success("Producto eliminado del carrito", {
			description: `${cartProduct.quantity} ${cartProduct.product.title} eliminados del carrito`,
		});
	};

	return (
		<div
			className="flex  gap-4 h-fit"
			onMouseEnter={() => setShowDelete(index)}
			onMouseLeave={() => setShowDelete(null)}
		>
			<Image
				src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${cartProduct?.image}`}
				alt={cartProduct.product?.title}
				className="border-3 shadow-md border-gray-100 rounded-md w-32"
				width={100}
				height={100}
			/>
			<div className="text-sm flex flex-col gap-4">
				<div className="flex justify-between">
					<p className="font-bold">{cartProduct.product?.title}</p>
					{showDelete === index && (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div
							className="cursor-pointer"
							onClick={() => removeCartProduct(cartProduct)}
						>
							<Icon icon={IconType.Trash} size={16} color="red" />
						</div>
					)}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="cursor-pointer sm:hidden"
						onClick={() => removeCartProduct(cartProduct)}
					>
						<Icon icon={IconType.Trash} size={16} color="red" />
					</div>
				</div>
				<div className="flex gap-2">
					<Badge variant="secondary">{cartProduct.size?.name}</Badge>
					<Badge variant="secondary">{cartProduct.color?.color}</Badge>
					<Badge variant="secondary">{cartProduct.material?.name}</Badge>
				</div>
				<div className="grid grid-cols-2 gap-8 items-stretch">
					<div className="grid gap-1 max-w-min">
						<Label>Cantidad: </Label>
						<Input value={cartProduct.quantity} />
					</div>
					<div className="flex flex-col gap-1">
						<p>Precio:</p>
						<p className="text-xl">
							${cartProduct.product.price * cartProduct.quantity}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
