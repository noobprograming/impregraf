"use client";
import type { Hero } from "@/app/types/home";
import BannerAnimation from "./BannerAnimation";
import React from "react";
import { motion } from "framer-motion";

export default function HomeHero({ hero }: { hero: Hero }) {
	return (
		<React.Fragment>
			<div className="hero-title text-4xl py-6 font-light">
				{hero.banners.length > 0 &&
					hero.banners[0].title?.split(" ")?.map((el, i) => (
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.25,
								delay: i / 10,
							}}
							key={el}
						>
							{el}{" "}
						</motion.span>
					))}
			</div>
			<BannerAnimation />
		</React.Fragment>
	);
}
