import {Configuration} from 'webpack';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common'; 

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const publicPath = '/adminx/';

const config: Configuration = merge.smart(common, {
    output: {
        publicPath: publicPath // fix webpack-dev-server font url problems
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            'SERVER_BASE_URL': JSON.stringify('/api/'),
            'BASE_HREF': JSON.stringify(publicPath)
        })
    ]
});

export default config;