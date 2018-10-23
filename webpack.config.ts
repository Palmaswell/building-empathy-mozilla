import { CheckerPlugin } from 'awesome-typescript-loader';
import { resolve } from 'path';


export default {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'building-empathy.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};