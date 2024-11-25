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
				<Icon icon={IconType.List} className="md:hidden" />
				<div className="hidden md:flex gap-6">
					<NavigationMenu className="gap-6 items-end">
						{menu.categories?.map((category) => (
							<NavigationMenuList key={category.id}>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="px-4">
										{category.name}
									</NavigationMenuTrigger>
									<NavigationMenuContent className="w-max p-4">
										{category.subcategories?.length > 0 &&
											category.subcategories?.map((category) => (
												<ListItem
													className="w-screen font-bold text-gray-400"
													key={category.name}
													href="/docs"
													title={category.name}
												>
													{category.products?.map((product) => (
														<ListItem
															className="text-black hover:bg-blue-600 hover:text-white hover:font-bold mt-2"
															key={product.title}
															href="/docs"
															title={product.title}
														/>
													))}
												</ListItem>
											))}
										{category.subcategories?.length === 0 &&
											category.products?.map((product) => (
												<ListItem
													className="text-black hover:bg-blue-600 hover:text-white hover:font-bold w-screen"
													key={product.title}
													href="/docs"
													title={product.title}
												/>
											))}
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						))}
					</NavigationMenu>
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
