module.exports = {
  port: 8180,
  proProxy: {
    '/api': {
      target: 'http://127:0.0.1:3366', //要代理的后端接口地址
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
};
