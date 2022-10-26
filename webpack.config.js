const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        one: './src/one.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name]_[hash].main.js"
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
            filename: 'css/[name]-[hash].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin()


    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader', options: {
                        modules: true,
                    }
                }],


            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },// translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },/// translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                }]
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: './../img',
                            outputPath: 'img/'
                        },
                    }
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: './../fonts',
                    outputPath: 'fonts/'
                },
            },

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 9000,
        proxy: {
            "/data": { //地址
                'target': 'http://www.bjlink32.com/data.php', //接口地址,跨域访问
                // secure: false,// 如果是https接口，需要配置这个参数
                "changeOrigin": true,//开启跨域
                "pathRewrite": { "^/data": "" }//如果接口本身没有/data需要通过pathRewrite来重写了地址
            }
        }
    },
    resolve: {
        extensions: ['.jsx', '.less', '.js', '.css']
    },



}