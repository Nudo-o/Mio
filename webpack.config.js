const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
    //mode: "development",
    target: [ "web", "es5" ],
    entry: "./src/index.js",
    //devtool: "cheap-module-source-map",
    output: {
        filename: "mio.min.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        port: 3000,
        open: true,
        client: {
            logging: "none",
            overlay: {
                errors: false,
                warnings: false,
                runtimeErrors: false
            }
        }
    },
    optimization: {
        flagIncludedChunks: true,
        concatenateModules: true,
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        minimize: true
    },
    plugins: [
        new TerserWebpackPlugin({
            sourceMap: false,
            parallel: true
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    module: {
        rules: [{
            test: /\.json$/,
            type: "json"
        }]
    },
}