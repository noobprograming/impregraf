"use client";

import { IconType } from "@/app/types/commons";
import Icon from "@/components/ui/icon";
import React from "react";
import { useCookies } from "react-cookie";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CartProductCard from "@/components/ui/cartProductCard";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";

export default function Cart() {
    const [cookies] = useCookies();
    const { cart, refreshCart } = useStore();
    const router = useRouter();

    const finishPurchase = async () => {
        router.push(`/checkout/${cart.documentId}`);
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
        refreshCart(cookies.cart);
    }, []);

    return (
        <Sheet>
            <SheetTrigger className="relative w-10 cursor-pointer">
                <Icon icon={IconType.ShoppingCart} size={24} />
                {cart?.cart_products?.length > 0 && (
                    <p className="absolute text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold top-0 right-0">
                        {cart?.cart_products?.length}
                    </p>
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tú carrito</SheetTitle>
                    <SheetDescription>
                        <div className="grid gap-4">
                            {cart?.cart_products?.length ? (
                                cart.cart_products.map((cartProduct, index) => (
                                    <React.Fragment key={cartProduct.documentId}>
                                        <CartProductCard cartProduct={cartProduct} index={index} />
                                        <Separator />
                                    </React.Fragment>
                                ))
                            ) : (
                                <p>Aún no agregaste productos al carrito</p>
                            )}
                            <SheetClose asChild>
                                <Button
                                    className="w-full"
                                    variant="default"
                                    type="button"
                                    onClick={finishPurchase}
                                >
                                    Finalizar compra
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
