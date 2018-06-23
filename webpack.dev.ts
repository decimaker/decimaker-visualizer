import {Configuration} from 'webpack';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';

const publicPath = '/';

const config: Configuration = merge.smart(common, {
    output: {
        publicPath: publicPath // fix webpack-dev-server font url problems
    },

    devServer: {
        stats: 'minimal',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'SERVER_BASE_URL': JSON.stringify('http://localhost/api/'),
            'BASE_HREF': JSON.stringify(publicPath)
        })
    ]
});

export default config;