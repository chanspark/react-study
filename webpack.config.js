const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = 'localhost';
const PORT = 8080;
const _PATH = resolve(__dirname, 'src');

module.exports = {
    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        './main.js'
    ],
    output: {
        filename: 'bundle.js',
        path: _PATH,
        publicPath: '/',
    },
    context: _PATH,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: _PATH,
        publicPath: '/',
        compress: true,
        port: PORT
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.scss$/,
                loaders : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use : ['css-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            }
        ],
        // loaders: [
        //
        // ]
    },
    resolve: {

        modules: [ _PATH, 'node_modules' ],
        extensions: [ '.js' ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.EvalSourceMapDevToolPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('./app.css')
    ]
};
