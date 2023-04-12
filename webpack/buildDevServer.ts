import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
  return {
        port: options.port,
        open: true,
    };
};

export default buildDevServer;