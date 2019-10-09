import path from 'path';

import webpack from 'webpack';
import yargs from 'yargs';

import pkg from './package';

const { optimizeMinimize } = yargs.alias('p', 'optimize-minimize').argv;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: { babelrcRoots: ['.', '../'] }
            }
        ]
    },
    externals: [],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
                __PACKAGE_VERSION__: JSON.stringify(pkg.version),
                __BUILD_TIME__: JSON.stringify(new Date().toISOString())
            }
        })
    ],
    devtool: optimizeMinimize ? 'source-map' : false
};

const bundleConfig = Object.assign({}, commonConfig, {
    entry: {
        BitwiseProto: './src/index.js'
    },
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js',
        library: 'BitwiseProto',
        libraryTarget: 'umd'
    },
    target: 'node'
});

const serverConfig = Object.assign({}, commonConfig, {
    entry: {
        BitwiseProto: './src/server/index.js'
    },
    output: {
        path: path.join(__dirname),
        filename: 'server.js',
        library: 'BitwiseProto',
        libraryTarget: 'umd'
    },
    target: 'node'
});


export default [bundleConfig, serverConfig];
