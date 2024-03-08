import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";

// import commonjs from "vite-plugin-commonjs";
// import commonjs from "@rollup/plugin-commonjs";
// import NodeResolve from "@rollup/plugin-node-resolve";

import { resolve } from "path";

import fs from "fs";
// import react from '@vitejs/plugin-react'
// import sass from 'sass'

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "docs");

// const assetsFiles = fs.readdirSync(resolve(root, "assets")).filter((file) => {
// 	console.log(file);
// 	return file.endsWith(".jpg");
// });

const htmlFiles = fs
	.readdirSync(resolve(root, "pages"))
	.filter((file) => {
		console.log(file);
		return file.endsWith(".html");
	})
	.map((file, index) => {
		// return ["html_page" + index, resolve(root, file)];
		return ["html_page" + index, resolve(root, "pages", file)];
		// console.log(index, resolve(root, "pages", file));
		// return resolve(root, "pages", file);
	});

export default defineConfig({
	// plugins: [htmlTemplate()],
	plugins: [
		splitVendorChunkPlugin(),
		// commonjs({
		// 	strictRequires: true,
		// 	include: /node_modules/,
		// 	transformMixedEsModules: true,
		// }),
		// NodeResolve({
		// 	extensions,
		// 	mainFields: ["module", "main", "jsnext:main", "browser"],
		// 	moduleDirectories: ["node_modules"],
		// 	// modulePaths: [resolve(root, "flickity")],
		// 	rootDir: root,
		// 	browser: true,
		// }),
	],

	base: "./src/",
	// base: "./src/",
	publicDir: false,
	root: root,
	mode: "Development",

	build: {
		target: "es2020",
		// ssr: true,

		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(root, "script.js"),
				// flickity: resolve(root, "flickity", "flickity.pkgd.min.js"),

				index: resolve(root, "index.html"),

				...Object.fromEntries(htmlFiles),

				// ...Object.fromEntries(assetsFiles),
			},

			output: {
				// chunkFileNames: (chunkInfo) => {
				// 	console.log(chunkInfo.name + "***");
				// },

				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split(".").pop();

					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						// extType = "assets";
						console.log(assetInfo.name + " :: " + extType + " :: " + "assets");
						return "pages/[name][extname]";
						// return "assets/[name][extname]";
					} else if (/css|ts/i.test(extType)) {
						console.log(assetInfo.name + " :: " + extType + " :: " + "styles");
						return "pages/[name]-[hash][extname]";
						// return "styles/[name]-[hash][extname]";
					} else if (/html/i.test(extType)) {
						console.log(assetInfo.name + " :: " + extType + " :: " + "pages");
						return "[name]-[hash][extname]";
						// return "pages/[name]-[hash][extname]";
					}

					console.log(
						assetInfo.name + " :: " + extType + " :: " + "assets nalang"
					);
					return "assets/[name]-[hash][extname]";
					// "css" is only one so no need to catch any possible outcome
				},

				// assetFileNames: "[name].[ext]",

				chunkFileNames: "scripts/[name]-[hash].js",

				entryFileNames: "scripts/[name]-[hash].js",

				dir: "docs",
				// dir: "docs/assets",
				generatedCode: "es5",
			},
		},

		modulePreload: {
			polyfill: false, // todo: SEARCH what is this
		},

		// commonjsOptions: {
		// 	// transformMixedEsModules: true,
		// 	// include: ["/src/flickity/flickity.pkgd.min.js"],
		// 	// exclude: ["/node_modules/jquery/dist/jquery.js"],
		// 	// requireReturnsDefault: "auto",
		// 	// requireReturnsDefault: "namespace",

		// 	// strictRequires: true,
		// 	// include: [/src\/flickity/],
		// 	// transformMixedEsModules: true,
		// 	extensions: extensions,
		// },
		// sourcemap: "hidden",
	},

	server: {
		port: 8888,
		strictPort: true,
		open: true,
	},

	// optimizeDeps: {
	// 	// entries: ["src/*.html", "src/script.ts"],
	// 	// include: ["src/script.ts"],
	// 	// force: true
	// 	// include: ["/src/flickity"],
	// 	// exclude: ["/node_modules"],
	// },

	// resolve: {
	// 	extensions: [".cjs", ".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
	// 	mainFields: ["module", "main", "jsnext:main", "browser"],
	// },
});
