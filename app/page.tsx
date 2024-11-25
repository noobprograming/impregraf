import Categories from "./components/Categories";
import HomeHero from "./components/Hero/Hero";
import Mvp from "./components/Mvp";
import { InternalService } from "@/app/api/internal";

export default async function Home() {
	const home = await new InternalService().getHome();
	console.log("🚀 ~ Home ~ home:", home);

	return (
		<div className="py-8 grid gap-14">
			{home.hero && <HomeHero hero={home.hero} />}
			{home.products && <Mvp products={home.products} />}
			{home.categories && <Categories categories={home.categories} />}
		</div>
	);
}
