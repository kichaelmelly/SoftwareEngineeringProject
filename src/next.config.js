/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	env: {
		// If development then set proxy to the local server for Flask
		BASE_URL:
			process.env.NODE_ENV === "development" ? "http://localhost:5000" : "",
	},
	...nextConfig,
};
