const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        one: './src/one.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]_[hash].main.js"
    },
    mode: "development",
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({ //假设是前台应用入口
            title: '首页',
            filename: "index.html",
            template: "./public/index.html",
            chunks: ["index"]    //chunks指定需要引入的入口模块的键名 index:"./src/index.js"
        }),
        new HtmlWebpackPlugin({//假设是后台应用入口one:"./src/one.js"
            title: 'One',
            filename: "one.html",
            template: "./public/one.html",
            chunks: ["one"] //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css',
        }),


    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                }]
            }


        ]
    }

}