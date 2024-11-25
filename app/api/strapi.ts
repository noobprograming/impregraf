import { STRAPI_API_TOKEN, STRAPI_URL } from "@/lib/envs";
import type { Cart } from "../types/cart";
import type { Category, Subcategory } from "../types/commons";

interface CartProductPayload {
	title: string;
	quantity: number;
	price: number;
	color: string;
	material: string;
	size: string;
	product: string;
	image: string;
}

interface CartProductBody {
	size?: { set: [{ documentId: string }] };
	color?: { set: [{ documentId: string }] };
	material?: { set: [{ documentId: string }] };
	product: { set: [{ documentId: string }] };
	quantity: number;
	image: string;
	cart: { set: [{ documentId: string }] };
}

class StrapiFetch {
	private apiUrl = `${STRAPI_URL}`;
	private apiToken = STRAPI_API_TOKEN;
	private options: RequestInit = {};
	private url: string;
	constructor(url: string) {
		this.url = this.apiUrl + url;
	}

	async Get(url: string) {
		const response = await fetch(this.url + url, {
			...this.options,
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});
		try {
			const { data } = await response.json();
			return data;
		} catch (error) {
			return {};
		}
	}

	async Put(url: string, body: unknown) {
		const response = await fetch(this.url + url, {
			...this.options,
			body: JSON.stringify({ data: body }),
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiToken}`,
			},
		});
		try {
			const { data } = await response.json();
			return data;
		} catch (error) {
			return {};
		}
	}

	async Post(url: string, body: unknown) {
		const response = await fetch(this.url + url, {
			...this.options,
			method: "POST",
			body: JSON.stringify({ data: body }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiToken}`,
			},
		});
		try {
			const { data } = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			return {};
		}
	}

	async Delete(url: string) {
		await fetch(this.url + url, {
			...this.options,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiToken}`,
			},
		});
	}
}

export class StrapiDataService extends StrapiFetch {
	constructor() {
		super("/api");
	}

	async getCategories(): Promise<Category[]> {
		return await this.Get(
			"/categories?populate[subcategories][populate][0]=products&populate[products][populate][0]=photos",
		);
	}

	async getSubcategories(): Promise<Subcategory[]> {
		return await this.Get(
			"/subcategories?populate[products][populate][0]=photos",
		);
	}

	async getProducts() {
		return await this.Get("/products?populate=photos");
	}

	async getProductBySlug(slug: string) {
		return await this.Get(`/products?filters[title][$eq]=${slug}&populate=*`);
	}

	async getCart(cart: string): Promise<Cart> {
		return await this.Get(
			`/carts/${cart}?populate[cart_products][populate][0]=size&populate[cart_products][populate][1]=color&populate[cart_products][populate][2]=material&populate[cart_products][populate][3]=product`,
		);
	}

	async createCardProduct({
		cart,
		cartProduct,
	}: { cart: string; cartProduct: CartProductPayload }) {
		let cartId = cart;
		if (!cart) {
			const cart = await this.Post("/carts", {});
			cartId = cart.documentId;
		}

		const body: CartProductBody = {
			cart: { set: [{ documentId: cartId }] },
			quantity: cartProduct.quantity,
			image: cartProduct.image,
			product: { set: [{ documentId: cartProduct.product }] },
		};
		if (cartProduct.size) {
			body.size = { set: [{ documentId: cartProduct.size }] };
		}
		if (cartProduct.color) {
			body.color = { set: [{ documentId: cartProduct.color }] };
		}
		if (cartProduct.material) {
			body.material = { set: [{ documentId: cartProduct.material }] };
		}

		await this.Post("/cart-products", body);
		return cartId;
	}

	async deleteCartProduct(cartProductId: string) {
		await this.Delete(`/cart-products/${cartProductId}`);
	}
}
