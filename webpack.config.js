const path = require('path');

module.exports = {
    entry: './src/mesh-ui.ts',
    devtool: 'inline-source-map',
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
    },
    output: {
        filename: 'mesh-ui.js',
        path: path.resolve(__dirname, 'lib'),
    },
};