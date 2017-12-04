const devserver = require('./webpack/devserver');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            uglifyJS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ]);
    }
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/index.js',
        },
        output: {
            path: PATHS.build,
            filename: './js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/index.pug'
            })
        ]
    },
    pug(),
    images()
]);