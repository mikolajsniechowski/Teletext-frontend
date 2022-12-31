const pages = {  
  index: "src/main.js",  
};  
const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {  
  publicPath: "/",
  outputDir: "dist",
  indexPath: "index.html",
  
  pages: pages,  
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    resolve: {
      fallback: {
          "perf_hooks":false,
          "child_process":false, 
          "fs": require.resolve("browserify-fs"), 
          "util": require.resolve("util"), 
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "tls": require.resolve("tls-browserify"),
          "net": require.resolve("net-browserify"),
          "crypto": require.resolve("crypto-browserify"), 
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify"), 
          "stream": require.resolve("stream-browserify"),
          "zlib": require.resolve("browserify-zlib")
      },
  },
  },
};
