const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'js/index': ['./app/src/js/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist',
        filename: '[name]_[chunkhash:5].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /^node_modules$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // {
            //     test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            //     exclude: /^node_modules$/,
            //     loader: 'file-loader?name=[name].[ext]'
            // },
            // {
            //     test: /\.(pbg|jpg|gif)$/,
            //     exclude: /^node_modules$/,
            //     loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            // },
            // {
            //     test: /\.jsx$/,
            //     exclude: /^node_modules$/,
            //     loader: ['jsx-loader', 'babel-loader']
            // }
        ]
    },
    // resolve: {
    //     extensions: ['.js', '.json']
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['js/index'],
            filename: 'index.html',
            template: 'app/src/page/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                let name = pathData.chunk.name.split('/').pop();
                return `css/${name}_[chunkhash:5].css`;
            }
        }),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"development"'
        // }),
        // new webpack.NoEmitOnErrorsPlugin()
    ]
}