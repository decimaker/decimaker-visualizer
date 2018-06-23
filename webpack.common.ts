import {Configuration} from 'webpack';
import path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: Configuration = {

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: ['./src/index.scss', './src/index.tsx'],
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                ] 
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Your website',
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
            hash: true
        }),
    ]
};

export default config;