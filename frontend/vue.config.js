// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()],
  // },
  transpileDependencies: ['feathers-vuex', 'vuetify'],
  // pwa: {
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: './src/sw.js',
  //     swDest: 'service-worker.js',
  //   },
  // },
  lintOnSave: process.env.NODE_ENV !== 'production',
};
