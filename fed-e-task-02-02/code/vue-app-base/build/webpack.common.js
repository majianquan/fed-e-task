const path = require('path')
const utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const os = require('os')
const webpack = require('webpack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const currentPath = process.cwd()
function resolve(dir) {
    return path.join(currentPath, '/', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
        ...require('./eslint.config')
    }
})

module.exports = function (config) {
    return {
        output: {
            path: config.build.assetsRoot,
            filename: "[name].js",
            publicPath:
                process.env.NODE_ENV === "production"
                    ? config.build.assetsPublicPath
                    : config.dev.assetsPublicPath
        },
        resolve: {
            extensions: [".js", ".vue", ".json"],
            modules: [resolve("src"), "node_modules/"],
            alias: {
                src: resolve("src"),
                css: resolve("assets/css"),
                img: resolve("assets/img"),
                tool: resolve("assets/tool"),
                config: resolve("src/config"),
                store: resolve("src/store")
            }
        },
        module: {
            rules: [
                ...(config.dev.useEslint ? [createLintingRule()] : []),
                {
                    test: /\.vue$/,
                    use: "vue-loader",
                    exclude: file => /\.md$/.test(file)
                    // options: vueLoaderConfig
                },
                {
                    test: /\.js$/,
                    loader: "happypack/loader?id=happy-babel-js",
                    // loader: 'babel-loader',
                    // options: require('./babel.config'),
                    exclude: [resolve("node_modules")]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: utils.assetsPath(
                            config,
                            "img/[name].[hash:7].[ext]"
                        )
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: utils.assetsPath(
                            config,
                            "media/[name].[hash:7].[ext]"
                        )
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: utils.assetsPath(
                            config,
                            "fonts/[name].[hash:7].[ext]"
                        )
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            // new webpack.DefinePlugin({
            //     BASE_URL: JSON.stringify("https://localhost.com"),
            // }),
            // 多进程，效果不佳
            new HappyPack({
                // 用id来标识 happypack处理那里类文件
                id: "happy-babel-js",
                // 如何处理  用法和loader 的配置一样
                loaders: [
                    {
                        loader: "babel-loader",
                        options: require("./babel.config")
                    }
                ],
                // 共享进程池
                threadPool: happyThreadPool,
                // 允许 HappyPack 输出日志
                verbose: true
            })
        ],
        node: {
            // prevent webpack from injecting useless setImmediate polyfill because Vue
            // source contains it (although only uses it if it's native).
            setImmediate: false,
            // prevent webpack from injecting mocks to Node native modules
            // that does not make sense for the client
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty"
        }
    };
}
