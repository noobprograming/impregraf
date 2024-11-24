import type { Cart } from "@/app/types/cart";
import { create } from "zustand";
import { StrapiDataService } from "@/app/api/strapi";

interface Store {
	cart: Cart;
	updateCart: (cart: Cart) => void;
	refreshCart: (cart: string) => void;
}

export const useStore = create<Store>((set) => ({
	cart: {} as Cart,
	updateCart: (cart: Cart) => set({ cart }),
	refreshCart: (cart: string) => refreshCart(cart),
}));

const refreshCart = async (cart: string) => {
	const storedCart = cart ?? "";
	const strapiService = new StrapiDataService();
	const _cart = await strapiService.getCart(storedCart);
	useStore.getState().updateCart(_cart);
};
