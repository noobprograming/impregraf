"use client";

import type { Product } from "@/app/types/commons";
import { STRAPI_URL } from "@/lib/envs";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
	const router = useRouter();

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={() => router.push(`/producto/${product.title}`)}
			key={product.id}
			className="rounded-lg grid gap-4 hover:shadow-2xl transition-all duration-300 border border-1 border-blue-100 hover:cursor-pointer"
		>
			<div className="block h-48 w-full ">
				{product.photos && (
					<div
						className="bg-cover bg-center h-full w-full"
						style={{
							backgroundImage: `url(${STRAPI_URL}${product.photos[0]?.url})`,
						}}
					/>
				)}
			</div>
			<div className="grid grid-cols-1 w-full px-4 pb-4 gap-3">
				<h3 className="font-semibold text-medium">{product.title}</h3>
				<div className="grid gap-2">
					<div className="grid">
						<p className="text-sm">Precio por unidad</p>
						<p className="text-medium font-bold text-blue-500">
							${product.price}
						</p>
					</div>
					<div className="grid">
						<p className="text-sm">Precio al por mayor</p>
						<p className="text-medium font-bold text-blue-500">
							${product.price}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
