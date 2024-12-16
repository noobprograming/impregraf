import * as React from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigationMenu";
import { InternalService } from "@/app/api/internal";
import type { Category, Menu } from "@/app/types/commons";
import { IconType } from "@/app/types/commons";
import Image from "next/image";
import Icon from "@/components/ui/icon";
import Cart from "./Header/Cart";
import { STRAPI_URL } from "@/lib/envs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export async function Header() {
	const menu: Menu = await new InternalService().getMenu();

	return (
		<header>
			<div className="py-4 flex justify-between items-center ">
				<Image
					src={`${STRAPI_URL}/uploads/logo_27ce4b8e0c.jpeg`}
					className="md:h-28 w-32 md:w-44"
					alt="logo"
					height={300}
					width={500}
				/>
				<div className="flex items-center gap-4">
					<Link href="/auth/login">Login</Link>
					<Separator orientation="vertical" />
					<Cart />
				</div>
			</div>
		</header>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<NavigationMenuLink asChild>
			<a
				ref={ref}
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					className,
				)}
				{...props}
			>
				<div className="text-md font-medium leading-none">{title}</div>
				<p className="line-clamp-2 text-md leading-snug text-muted-foreground">
					{children}
				</p>
			</a>
		</NavigationMenuLink>
	);
});
ListItem.displayName = "ListItem";
