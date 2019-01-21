const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    chainWebpack: function (config) {
        config.resolve.alias
            .set('comp', resolve('src/components'))
            .set('pages', resolve('src/pages'))
    },
    configureWebpack: config => {
        /* if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
              })
            )
        } */
        externals: {
            vue: 'Vue'
        }
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'server',
                        analyzerHost: '127.0.0.1',
                        analyzerPort: 8889,
                        reportFilename: 'report.html',
                        defaultSizes: 'parsed',
                        openAnalyzer: true,
                        generateStatsFile: false,
                        statsFilename: 'stats.json',
                        statsOptions: null,
                        logLevel: 'info'
                    })
                ]
            }
        }
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                }
            ]
        }
    },
    productionSourceMap: false,
}