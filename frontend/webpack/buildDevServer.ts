import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
  return {
    port: options.port,
    open: false,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/media': 'http://127.0.0.1:5000'
    }
  };
};

export default buildDevServer;
