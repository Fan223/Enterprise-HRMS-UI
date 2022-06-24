const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/hrms': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true
      },
      "/api": {
        target: 'https://sm.ms',
        changeOrigin: true, 
        secure: false,
        headers: {                  
          Referer: 'https://sm.ms'
        }
      },
    }
  }
})
