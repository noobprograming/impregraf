import { INTERNAL_API_URL } from "@/lib/envs";
import type { ProductPage } from "../types/product";
import { Home } from "../types/home";

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
		return (await this.Get("/home")) ?? ({} as Home);
	}

	async getMenu() {
		return await this.Get("/menu");
	}

	async getProductPage(slug: string): Promise<ProductPage> {
		const productPage = await this.Get(`/product/${slug}`);
		return productPage;
	}

	async createMpPreference(body: any) {
		return await this.Post("/mercadopago", body);
	}
}

