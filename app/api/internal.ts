import { INTERNAL_API_URL } from "@/lib/envs";
import type { ProductPage } from "../types/product";
import type { Home } from "../types/home";
import type { Menu } from "../types/commons";

class InternalFetch {
	private url = INTERNAL_API_URL;

	async Get(url: string) {
		try {
			const response = await fetch(this.url + url);
			return await response.json();
		} catch (error) {
			return {};
		}
	}

	async Post(url: string, body: any) {
		try {
			const response = await fetch(this.url + url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			return await response.json();
		} catch (error) {
			return {};
		}
	}
}

export class InternalService extends InternalFetch {
	async getHome(): Promise<Home> {
		try {
			const home = await this.Get("/home");
			return home;
		} catch (error) {
			console.log("🚀 ~ InternalService ~ getHome ~ error:", error);
			return {} as Home;
		}
	}

	async getMenu() {
		try {
			const menu = await this.Get("/menu");
			return menu;
		} catch (error) {
			console.log("🚀 ~ InternalService ~ getMenu ~ error:", error);
			return {} as Menu;
		}
	}

	async getProductPage(slug: string): Promise<ProductPage> {
		const productPage = await this.Get(`/product/${slug}`);
		return productPage;
	}

	async createMpPreference(body: any) {
		return await this.Post("/mercadopago", body);
	}
}
