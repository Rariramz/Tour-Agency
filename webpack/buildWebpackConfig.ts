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
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        optimization: {
            minimizer: [
              // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
              // `...`,
              new CssMinimizerPlugin(),
            ],
        },
        resolve: buildResolvers(options),
        devtool: 'inline-source-map',
        devServer: buildDevServer(options),
    };
}