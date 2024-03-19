const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      // @ts-ignore
      '@': path.resolve(__dirname, './src'),
      "~@": path.resolve(__dirname, "/src"),
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/eshop-ai-assistent/'
      : '/'
})
