"use client";

import { STRAPI_URL } from "@/lib/envs";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function BannerAnimation() {
	const limitImage = React.useRef<HTMLDivElement>(null);
	const [animatedImageIndex, setAnimatedImageIndex] = React.useState(0);
	const [isAnimating, setIsAnimating] = React.useState(true);

	const animatedImages = [
		{
			url: `${STRAPI_URL}/uploads/pngwing_com_6f97c948b3.png`,
			initial: {
				x: "-300%",
				rotate: 0,
				opacity: 0.5,
			},
			animate: {
				x: "0%",
				rotate: 360,
				transition: { duration: 2 },
				opacity: 1,
			},
			onFinishAnimation: {
				x: "300%",
				rotate: 720,
				transition: { duration: 2 },
				opacity: 1,
			},
		},
		{
			url: `${STRAPI_URL}/uploads/taylor_swift_1752710_151c61ff9d.jpg`,
			initial: {
				x: "-300%",
				zoom: 0,
				opacity: 0.8,
				borderRadius: "100%",
			},
			animate: {
				x: "0%",
				zoom: 1,
				opacity: 1,
				transition: { duration: 2 },
			},
			onFinishAnimation: {
				x: "300%",
				zoom: 0,
				opacity: 0,
				transition: { duration: 2 },
			},
		},
	];

	const handleAnimationComplete = () => {
		setTimeout(() => {
			setIsAnimating(false); // Cambia el estado para iniciar la animación de salida
		}, 700); // Espera 1 segundo antes de iniciar la salida
		setTimeout(() => {
			setAnimatedImageIndex(
				animatedImageIndex + 1 === animatedImages.length
					? 0
					: animatedImageIndex + 1,
			);
			setIsAnimating(true); // Cambia el estado para iniciar la animación de salida
		}, 1400);
	};

	return (
		<div className="relative flex justify-center items-center">
			<motion.img
				key={animatedImages[animatedImageIndex].url}
				src={animatedImages[animatedImageIndex].url}
				className="content-center justify-items-center w-24 h-24"
				alt="Movible"
				style={{ width: "100px", height: "100px", position: "absolute" }}
				initial={animatedImages[animatedImageIndex].initial}
				animate={
					isAnimating
						? animatedImages[animatedImageIndex].animate
						: animatedImages[animatedImageIndex].onFinishAnimation
				}
				onAnimationComplete={isAnimating ? handleAnimationComplete : undefined}
			/>
			<motion.div ref={limitImage} className="justify-items-end">
				<Image
					src={`${STRAPI_URL}/uploads/remera_adulto_unisex_blanca_sublimable_adb999db75.jpg`}
					alt="pikachu"
					width={300}
					height={300}
				/>
			</motion.div>
		</div>
	);
}
