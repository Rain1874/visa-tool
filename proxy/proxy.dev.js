export default {
  port: 3366,
  mock: true,
  devProxy: {
    '/api': {
      target: 'http://127:0.0.1:3366', //要代理的后端接口地址
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
};
