import { Configuration } from 'webpack';
import { BuildOptions } from './types';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildDevServer from './buildDevServer';
import buildResolvers from './buildResolvers';

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
      path: paths.build,
      publicPath: '/',
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()]
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'eval-source-map' : false,
    devServer: buildDevServer(options)
  };
}
