import type { PayType } from "./../types/checkout";
import { INTERNAL_API_URL } from "@/lib/envs";
import type { ProductPage } from "../types/product";
import type { Home } from "../types/home";
import type { Menu } from "../types/commons";
import type { Cart } from "../types/cart";

class InternalFetch {
	private url = INTERNAL_API_URL;

	async Get(url: string) {
		console.log("🚀 ~ InternalFetch ~ Get ~ this.url + url:", this.url + url);
		try {
			const response = await fetch(this.url + url);
			return await response.json();
		} catch (error) {
			console.log("🚀 ~ InternalFetch ~ Get ~ error:", error);
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
			console.log("🚀 ~ InternalFetch ~ Post ~ error:", error);
			return {};
		}
	}
}

export class InternalService extends InternalFetch {
	async getHome(): Promise<Home> {
		try {
			const home = await this.Get("/home");
			console.log("🚀 ~ InternalService ~ getHome ~ home:", home);
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

	async createMpPreference(body: Cart, type: PayType) {
		const _body = {
			cart: body,
			type,
		};
		return await this.Post("/mercadopago", _body);
	}
}
