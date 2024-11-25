import type { Product } from "@/app/types/commons";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./carousel";
import { ProductCard } from "./productCard";

export function ProductCardCarousel({ products }: { products: Product[] }) {
	return (
		<Carousel>
			<CarouselContent>
				{products?.length > 0 &&
					products?.map((product) => (
						<CarouselItem
							className="basis-[75%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
							key={product.title}
						>
							<ProductCard product={product} />
						</CarouselItem>
					))}
			</CarouselContent>
			<CarouselPrevious className="hidden md:flex" />
			<CarouselNext className="hidden md:flex" />
		</Carousel>
	);
}
