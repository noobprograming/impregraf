"use client";
import type { Hero } from "@/app/types/home";
import BannerAnimation from "./BannerAnimation";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HomeHero({ hero }: { hero: Hero }) {
    const [textIndex, setTextIndex] = useState(0);

    setInterval(() => {
        setTextIndex(textIndex === text.length - 1 ? 0 : textIndex + 1);
    }, 2000);

    const text = [
        "lapiceras",
        "tazas",
        "gorras",
        "remeras",
        "camisetas",
    ]
    return (
        <React.Fragment>
            <div className="hero-title grid text-2xl sm:text-4xl py-6 font-light">
                <div className="grid grid-cols-2 gap-2 justify-center min-w-full">
                    <span className="col-span-1 flex justify-end">
                        Personalizamos
                    </span>
                    <span className="col-span-1 flex justify-start">
                        {text.map((_text, index) => {
                            return index === textIndex && (
                                <motion.span
                                    key={_text}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.5,
                                    }}
                                    className="font-bold"
                                >
                                    {_text}
                                </motion.span>
                            )
                        })}
                    </span>
                </div>

                <div className="md:px-8 lg:px-16">
                    {"para eventos empresariales, uso personal, para tu empresa o reventa al mejor precio y calidad del mercado"}
                </div>
            </div>
        </React.Fragment >
    );
}
