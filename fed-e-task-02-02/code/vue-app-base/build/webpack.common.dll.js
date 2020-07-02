const path = require('path');
const webpack = require('webpack');
const curPath = process.cwd()

module.exports = {
    entry: {
        vendor: [
            'vue',
            'vue-router',
            'vuex',
            'vue-resource',
            'js-cookie'
        ]
    },
    output: {
        path: path.resolve(curPath, './dist/assets/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
}