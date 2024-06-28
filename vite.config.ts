import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import vercel from "vite-plugin-vercel";

export default defineConfig({
	plugins: [
		// devtools(),
		solidPlugin(),
		vercel(),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
});
