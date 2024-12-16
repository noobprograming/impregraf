/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import { InternalService } from "@/app/api/internal";
import Image from "next/image";
import { STRAPI_URL } from "@/lib/envs";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import BreadcrumbWrapper from "@/components/ui/breadcrubWrapper";
import type { ProductPage } from "@/app/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCookies } from "react-cookie";
import { StrapiDataService } from "@/app/api/strapi";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function Producto({ params }: { params: { slug: string } }) {
    const internalApi = new InternalService();
    const strapiService = new StrapiDataService();
    const [cookies, setCookies] = useCookies();
    const [productPage, setProductPage] = React.useState<ProductPage>(
        {} as ProductPage,
    );
    const [selectedSize, setSelectedSize] = React.useState<string>("");
    const [selectedColor, setSelectedColor] = React.useState<string>("");
    const [quantity, setQuantity] = React.useState<number>(1);
    const [selectedMaterial, setSelectedMaterial] = React.useState<string>("");

    const handleAddToCart = async () => {
        const cartId = await strapiService.createCardProduct({
            cart: cookies.cart,
            cartProduct: {
                title: productPage.product.title,
                price: productPage.product.price,
                material: selectedMaterial,
                product: productPage.product.documentId,
                size: selectedSize,
                color: selectedColor,
                quantity,
                image: productPage.product.photos[0]?.url,
            },
        });
        useStore.getState().refreshCart(cartId);
        setCookies("cart", cartId);
        toast.success("Producto agregado al carrito", {
            description: `${quantity} ${productPage.product.title} agregados al carrito`,
        });
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
        const getProductPage = async () => {
            const product = await internalApi.getProductPage(params.slug);
            setProductPage(product);
            setSelectedSize(product.product.sizes[0]?.documentId ?? selectedSize);
            setSelectedColor(product.product.colors[0]?.documentId ?? selectedColor);
            setSelectedMaterial(
                product.product.material?.documentId ?? selectedMaterial,
            );
        };
        getProductPage();
    }, []);

    return (
        <div className="grid gap-8">
            {productPage.product?.id && (
                <React.Fragment>
                    <BreadcrumbWrapper items={productPage.breadcrumbItems} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>
                                        {productPage.product.photos?.length > 0 &&
                                            productPage.product.photos.map((photo) => (
                                                <Image
                                                    key={photo.url}
                                                    src={`${STRAPI_URL}${photo.url} `}
                                                    alt={photo.url}
                                                    width={500}
                                                    height={500}
                                                />
                                            ))}
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex" />
                                <CarouselNext className="hidden md:flex" />
                            </Carousel>
                        </div>
                        <form className="grid content-between gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-4xl font-bold">
                                        {productPage.product.title}
                                    </h1>
                                    <p className="text-4xl font-semibold">
                                        ${productPage.product.price}
                                    </p>
                                </div>
                                <h3 className="text-lg font-regular">
                                    {productPage.product.description}
                                </h3>
                                {productPage.product?.sizes?.length > 0 && (
                                    <div className="grid gap-2">
                                        <p className="text-lg">Talles:</p>
                                        <div className="flex gap-2">
                                            {productPage.product?.sizes.map((size) => (
                                                <Badge
                                                    key={size.key}
                                                    variant={
                                                        selectedSize === size.documentId
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() => setSelectedSize(size.documentId)}
                                                    className="cursor-pointer"
                                                >
                                                    {size.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {productPage.product?.colors?.length > 0 && (
                                    <div className="grid gap-2">
                                        <p className="text-lg">Colores:</p>
                                        <div className="flex gap-2">
                                            {productPage.product?.colors?.map((color) => (
                                                <div
                                                    key={color.key}
                                                    className="rounded-md p-2"
                                                    style={{
                                                        border:
                                                            selectedColor === color.documentId
                                                                ? "1px solid black"
                                                                : "none",
                                                        boxShadow:
                                                            selectedColor === color.documentId
                                                                ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
                                                                : "none",
                                                    }}
                                                >
                                                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-black cursor-pointer"
                                                        style={{
                                                            backgroundColor: color.value,
                                                        }}
                                                        onClick={() => setSelectedColor(color.documentId)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {productPage.product?.material?.id && (
                                    <div className="grid gap-2">
                                        <p className="text-lg">Material:</p>
                                        <Badge
                                            className="w-fit cursor-pointer"
                                            variant={
                                                selectedMaterial ===
                                                    productPage.product.material.documentId
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setSelectedMaterial(
                                                    productPage.product.material.documentId,
                                                )
                                            }
                                        >
                                            {productPage.product.material.name}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                            <Separator />
                            <div className="grid grid-cols-3 gap-4 items-end">
                                <div className="col-span-1">
                                    <Label htmlFor="quantity">Cantidad</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        placeholder="Cantidad"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(Number.parseInt(e.target.value))
                                        }
                                    />
                                </div>
                                <Button
                                    className="col-span-2 w-full"
                                    variant="default"
                                    type="button"
                                    onClick={handleAddToCart}
                                >
                                    Agregar al carrito
                                </Button>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}
