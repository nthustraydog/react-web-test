const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'docs');

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            components: path.resolve(srcPath, 'components'),
            api: path.resolve(srcPath, 'api'),
            decorations: path.resolve(srcPath, 'decorations')
        }
    },
    entry: {
        index: ['./index.jsx', '@babel/polyfill'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            //第一個loader編譯JSX
            { 
                test: /\.jsx$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { 
                        presets: [
                            '@babel/preset-react', // JSX -> Javascript
                            '@babel/preset-env' // ES5 -> ES6
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    } 
                }
            },
            //第二個loader編譯ES6
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { 
                        presets: [
                            '@babel/preset-env'
                        ] 
                    } 
                } 
            }, 
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minChunks: 2,
            name: true,
            cacheGroups: {
                vendor: {
                    filename: 'vendor.bundle.js'
                }
            }
        }        
    },
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 7070
    },
    devtool: 'cheap-source-map'
};
