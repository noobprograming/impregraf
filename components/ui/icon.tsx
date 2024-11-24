"use client";

import { IconType } from "@/app/types/commons";
import { List, ShoppingCart, X, Trash } from "@phosphor-icons/react";
import type { IconWeight } from "@phosphor-icons/react";

interface IconProps {
	icon: IconType;
	className?: string;
	weight?: IconWeight;
	size?: number;
	color?: string;
}

export default function Icon({
	icon,
	weight = "bold",
	className,
	size = 32,
	color = "black",
}: IconProps) {
	switch (icon) {
		case IconType.List:
			return (
				<List color={color} size={size} weight={weight} className={className} />
			);
		case IconType.Close:
			return (
				<X color={color} size={size} weight={weight} className={className} />
			);
		case IconType.ShoppingCart:
			return (
				<ShoppingCart
					color={color}
					size={size}
					weight={weight}
					className={className}
				/>
			);
		case IconType.Trash:
			return (
				<Trash
					color={color}
					size={size}
					weight={weight}
					className={className}
				/>
			);
		default:
			return null;
	}
}
