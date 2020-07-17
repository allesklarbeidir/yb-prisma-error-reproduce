const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    
    entry: {
        "main": "./index.js"
    },
    resolve: {
        extensions: [".js", ".json"],

        // Alias-Shortcuts for Imports
        alias: {
            "~": path.resolve(__dirname, "src"),
        }
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    target: "node",
    mode: "production",
	optimization: {
		minimize: true
	},
    devtool: false,
    externals: [
        nodeExternals()
    ],
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        new CopyWebpackPlugin(["./prisma/schema.prisma","./prisma/.env"])
    ]

}