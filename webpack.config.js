const ESMWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const path = require('path');

const reusable = {
    entry: './src/mesh-ui.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
}

const esm = {
    ...reusable,
    output: {
        filename: 'mesh-ui.esm.js',
        path: path.resolve(__dirname, 'lib'),
        library: "LIB",
        libraryTarget: "var"
    },
    plugins: [
        new ESMWebpackPlugin()
    ]
};

const global = {
    ...reusable,
    output: {
        filename: 'mesh-ui.global.js',
        path: path.resolve(__dirname, 'lib'),
        library: "MeshUI",
        libraryTarget: "var"
    },
};

module.exports = [esm, global];