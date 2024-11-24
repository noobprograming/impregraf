import Categories from "./components/Categories";
import HomeHero from "./components/Hero/Hero";
import Mvp from "./components/Mvp";
import { InternalService } from "@/app/api/internal";

export default async function Home() {
    const home = await new InternalService().getHome();

    return (
        <div className="py-8 grid gap-14">
            <HomeHero hero={home.hero} />
            <Mvp products={home.products} />
            <Categories categories={home.categories} />
        </div>
    );
}