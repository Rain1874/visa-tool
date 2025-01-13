/*
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2025-01-10 17:05:03
 * @LastEditors: zhangxy
 * @LastEditTime: 2025-01-13 16:49:13
 */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import proxy from './proxy/proxy.dev';
const isDevelopment = process.env.NODE_ENV === 'development';
// https://vitejs.dev/config/

console.log('isDevelopment',isDevelopment)

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [
            ['babel-plugin-styled-components', { displayName: true }],
          ],
        },
      }),
      {
        ...viteCompression(),
        apply: 'build',
      },
      isDevelopment &&
        proxy.mock &&
        viteMockServe({
          mockPath: './mock',
          enable: true,
          watchFiles: true,
          logger: true,
        }),
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd'],
          },
        },
      },
    },
    base: isDevelopment ? '/': '/visa-tool/',
    server: {
      host: '0.0.0.0',
      port: proxy.port,
      open: true,
      proxy: proxy.devProxy,
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  });
};
