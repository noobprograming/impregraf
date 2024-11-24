import { INTERNAL_API_URL } from "@/lib/envs";
import type { ProductPage } from "../types/product";

class InternalFetch {
	private url = INTERNAL_API_URL;

	async Get(url: string) {
		const response = await fetch(this.url + url);
		try {
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	async Post(url: string, body: any) {
		try {
			const response = await fetch(this.url + url, {
				method: "POST",
				body: JSON.stringify(body),
			});
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}
}

export class InternalService extends InternalFetch {
	async getHome() {
		return await this.Get("/home");
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
