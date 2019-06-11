const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const ENV = isProd ? process.env.CI_ENVIRONMENT_NAME : ( process.env.npm_package_config_app_env || 'qa' );
const envPrefix = ENV === 'prod' ? '' : `${ENV}.`;

const sassLoader = { loader: "sass-loader", options: {
    includePaths: [
        path.resolve( __dirname, 'node_modules/@blueprintjs/core/src' )
    ]
} };

const fileLoader = [{
    loader: 'file-loader',
    options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
    }
}]

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: './static',
        historyApiFallback: true,
        port: 4600
    },
    entry: "./src/index.tsx",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'static/build'),
        publicPath: "build/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".mjs", ".jsx", ".d.ts"],
        alias: {
            types: path.resolve(__dirname, 'src/types'),
            components: path.resolve(__dirname, 'src/components'),
            queries: path.resolve(__dirname, 'src/queries')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, use: [ "style-loader", "css-loader", sassLoader ] },
            { test: /\.mjs$/, include: /node_modules/, type: "javascript/auto" },
            { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: fileLoader }
        ],
    },
    plugins: [
        new webpack.DefinePlugin( isProd ? {
            APP_ENV: JSON.stringify( ENV ),
            API_URL: JSON.stringify( `https://${envPrefix}api.biw.cloud` ),
            COMPANY_CODE: JSON.stringify( '' ),
        } : {
            APP_ENV: JSON.stringify( ENV ),
            API_URL: JSON.stringify( process.env.API_URL || `https://${envPrefix}api.biw.cloud` ),
            COMPANY_CODE: JSON.stringify( process.env.npm_package_config_company_code || '' ),
        })
    ]
}
