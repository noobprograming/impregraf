/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "strapi-8l20.onrender.com",
				pathname: "/uploads/**",
			},
		],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
