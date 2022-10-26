const path = require("path");//nodejs内置模块
const base = require("./webpack.config.base");
const merge = require('webpack-merge');

module.exports = merge(base, {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },

                    }
                ],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader', // creates style nodes from JS strings


                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        modules: true,
                    },
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                }]
            },

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 9000,
        proxy: {
            "/data": { //地址
                "target": "http://www.bjlink32.com/data.php", //接口地址,跨域访问
                // secure: false,// 如果是https接口，需要配置这个参数
                "changeOrigin": true,//开启跨域
                "pathRewrite": { "^/data": "" }//如果接口本身没有/data需要通过pathRewrite来重写了地址
            }
        },
        overlay: {
            warnings: true,
            errors: true
        },
    }


});
