import type { Cart } from "@/app/types/cart";
import { create } from "zustand";
import { StrapiDataService } from "@/app/api/strapi";

interface Store {
	cart: Cart;
	updateCart: (cart: Cart) => void;
	refreshCart: (cart: string) => Promise<Cart>;
}

export const useStore = create<Store>((set) => ({
	cart: {} as Cart,
	updateCart: (cart: Cart) => set({ cart }),
	refreshCart: (cart: string): Promise<Cart> => refreshCart(cart),
}));

const refreshCart = async (cart: string): Promise<Cart> => {
	const storedCart = cart;
	if (!storedCart) {
		return {} as Cart;
	}
	const strapiService = new StrapiDataService();
	const _cart = await strapiService.getCart(storedCart);
	useStore.getState().updateCart(_cart);
	return _cart;
};
