const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    watch: true,
    stats: "minimal",
    entry: {
        index: "./src/index.ts",
        // additionalui: "./src/index.ts",
        accordion: "./src/plugins/accordion/index.ts",
        // carousel: "./src/plugins/carousel/index.ts",
    },
    module: {
        rules: [
            { test: /\.ts?$/, enforce: "pre", use: ["source-map-loader"] },
            { test: /\.ts?$/, use: "ts-loader", exclude: /node_modules/ },
        ],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: { type: "umd" },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    // Additional configuration to generate additionalui.js in the root directory
    // entry: {
    //     additionalui: "./src/index.ts",
    // },
    // output: {
    //     path: path.resolve(__dirname),
    //     filename: "additionalui.js",
    //     library: { type: "umd" },
    // },
};
