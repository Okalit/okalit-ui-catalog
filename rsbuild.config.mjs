import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';

export default defineConfig({
  plugins: [pluginBabel({
    include: /\.js$/,
    babelLoaderOptions: { plugins: [['@babel/plugin-proposal-decorators', { version: '2023-05' }]] },
  })],
  source: { entry: { index: './demo.js' } },
  html: { template: './index.html' },
});