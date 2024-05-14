const path = require('path')

module.exports = {
    mode: 'production',
    watch: true,
    entry: {
        'aui.min': './src/index.js',
        'accordion': './src/components/as-accordion/index.js',
        // 'carousel': './src/components/as-carousel/index.js',
        'collapse': './src/components/as-collapse/index.js',
        'dropdown': './src/components/as-dropdown/index.js',
        'overlay': './src/components/as-overlay/index.js',
        'remove-element': './src/components/as-remove-element/index.js',
        'scrollspy': './src/components/as-scrollspy/index.js',
        'tabs': './src/components/as-tabs/index.js',
        'tooltip': './src/components/as-tooltip/index.js',
        'dropdown-dots': './src/components/as-dropdown-dots/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
            type: 'umd'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
}