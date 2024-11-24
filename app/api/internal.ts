import { INTERNAL_API_URL } from "@/lib/envs";
import type { ProductPage } from "../types/product";

class InternalFetch {
	private url = INTERNAL_API_URL;

	async Get(url: string) {
		try {
			const response = await fetch(this.url + url);
			if (!response.ok) {
				const text = await response.text();
				console.error("Response text:", text);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new TypeError("Response is not JSON");
			}
			return await response.json();
		} catch (error) {
			console.error(`Error fetching ${url}:`, error);
			return null;
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
			if (!response.ok) {
				const text = await response.text();
				console.error("Response text:", text);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new TypeError("Response is not JSON");
			}
			return await response.json();
		} catch (error) {
			console.error(`Error posting to ${url}:`, error);
			return null;
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
